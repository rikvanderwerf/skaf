import datetime
import logging
import uuid

from codercore.db import Base as CoderBase, DBSession as session
from codercore.lib.settings import settings
from sqlalchemy import (Column, DateTime, Enum, String, or_, cast,
                        create_engine)
from sqlalchemy.orm import Query
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm.relationships import RelationshipProperty
from sqlalchemy.sql import false
from sqlalchemy.sql.expression import text
from zope.sqlalchemy import register


DBSession = session
Base = CoderBase

log = logging.getLogger(__name__)

class LineageBase(object):

    def set_lineage(self, parent, name, request=None):
        self.__name__ = name
        self.__parent__ = parent
        self.request = request
        self.requires_oauth = False


class EndpointBase(object):
    __default_order_field__ = 'date_created'
    __identifier__ = 'id'

    """
    For models that are meant to be returned as a root resource through an API
    endpoint.
    """

    date_created = Column(DateTime, default=datetime.datetime.utcnow,
                          nullable=False)


class OwnableBase(object):
    __owner_type_enum__ = Enum('provider', 'user', 'organisation', 'event',
                               'group', name='owner_type')

    owner_type = Column(__owner_type_enum__)

    def _get_owner(self):
        try:
            return self._owner
        except AttributeError:
            pass

        if self.owner_type == 'provider':
            owner = self.owner_provider
        elif self.owner_type == 'user':
            owner = self.owner_user
        elif self.owner_type == 'organisation':
            owner = self.owner_organisation
        elif self.owner_type == 'event':
            owner = self.owner_event
        elif self.owner_type == 'group':
            owner = self.owner_group
        else:
            raise ValueError("Media object has no owner")

        self._owner = owner

        return owner

    owner = property(_get_owner)

    # Backref relationships to implementing classes should be structured like
    # owner_{owner_type}.

class PaginateQuery(Query):

    def _get_model(self):
        """Returns the query's underlying model classes."""
        if hasattr(self, 'attr'):
            # we are dealing with a subquery
            return self.attr.target_mapper.class_
        else:
            try:
                return self.column_descriptions[0]['expr'].class_
            except AttributeError:
                return self.column_descriptions[0]['expr']

    def search(self, search_term, model):
        """Searches model search fields while joining relationships.

        Goes through each search field declared on the model and joins the
        needed relationships. When reachin the property it is added to a list
        of search properties which is then filtered upon.
        """
        q = self
        search_properties = []

        # Join all the necessary relationships and extract the search
        # properties
        try:
            for field in model.__search_fields__:
                for attr in field.split('.'):
                    child = getattr(model, attr)
                    if isinstance(child.property, RelationshipProperty):
                        model = child.property.argument()
                        q = q.join(child)
                    else:
                        search_properties.append(child)
        except AttributeError:
            return q

        # Filter based on the the extracted search properties
        q = q.filter(
            or_(
                cast(search_property, String).ilike(search_term) for
                search_property in
                search_properties
            )
        )

        return q

    def _setup_paginate(self, order_field, search_term):
        model = self._get_model()
        if not order_field:
            order_field = model.__default_order_field__
        search_term = "%{}%".format(search_term)
        q = self.search(search_term, model)
        return (model, order_field, search_term, q)

    def _order_and_limit(self, q, model, order_field, order, limit):
        if model.__tablename__ in order_field:
            order_field = order_field.replace('.', '_')
        return q.order_by(
            text("{} {}".format(order_field, order))
        ).limit(limit)

    def _prepare_query(self, q, model, order_field):
        joins = []
        order_model = model
        for attr in order_field.split('.'):
            try:
                child = getattr(model, attr)
                if isinstance(child.property, RelationshipProperty):
                    order_model = child.property.argument
                    joins.append(order_model)
                else:
                    order_field = attr
            except AttributeError:
                # This happens when attr is the same as the model.
                pass

        order_field_value_query = self.from_self(
            getattr(order_model, order_field),
            getattr(model, model.__identifier__)
        )

        # We need to join the model for the id to be present.
        if order_model != model:
            order_field_value_query = order_field_value_query.join(model)

        # the last index will be the table that we order on, so this is
        # already present. So we remove it from the list.
        for table in joins[:-1]:
            q = q.join(order_model)
            order_field_value_query = order_field_value_query.join(table)

        return q, order_field_value_query, order_model, order_field

    def paginate(self, search_term='', offset=0, limit=10, order='desc',
                 order_field=None, next_page_key=None, **kwargs):
        model, order_field, search_term, q = self._setup_paginate(
            order_field, search_term)

        if '.' not in order_field:
            order_field = '{}.{}'.format(model.__tablename__, order_field)

        if offset == 0 and not next_page_key:
            return self._order_and_limit(q, model, order_field, order, limit)

        q, order_field_value_query, order_model, order_field = (
            self._prepare_query(q, model, order_field))

        if next_page_key and isinstance(next_page_key, uuid.UUID):
            order_field_value_query = order_field_value_query.filter(
                getattr(model, model.__identifier__) == next_page_key)
            try:
                next_page_key_order_value, _ = order_field_value_query.one()
            except NoResultFound:
                return DBSession.query(model).filter(false())
        else:
            if next_page_key and order == "desc":
                return DBSession.query(model).filter(false())

            # Because we want to do the seek method also when we got the
            # offset,
            # we need to get the id and order field of the item at the offset
            # (.offset(offset - 1)).
            try:
                next_page_key_order_value, next_page_key = (
                    self._get_order_field_value(
                        order_field_value_query, model, order_model,
                        order_field, order, offset).one())
            except (TypeError, NoResultFound):
                return DBSession.query(model).filter(false())

        return self._paginate(q, model, order_model, next_page_key,
                              next_page_key_order_value,
                              search_term, limit,  order, order_field)

    def _get_order_field_value(self, order_field_value_query, model,
                               order_model, order_field, order, offset):
        offset = offset - 1 if (offset > 0) else offset
        return order_field_value_query.order_by(
            self._get_order_text(model, order_model, order_field, order)
        ).offset(offset).limit(1)

    def _paginate(self, query, model, order_model, next_page_key,
                  next_page_key_order_value, search_term, limit, order,
                  order_field):
        q = query
        # In Postgresql you can use filter on two fields.
        # So what we do here is, for example if we want to filter on
        # id and date created:
        # (User.date_created, User.id) < (2018-04-01, UUID)

        if order == 'desc':
            q = q.filter((getattr(order_model, order_field),
                          getattr(model, model.__identifier__)) < (
                              next_page_key_order_value, next_page_key))
        else:
            q = q.filter((getattr(order_model, order_field),
                          getattr(model, model.__identifier__)) > (
                              next_page_key_order_value, next_page_key))

        # And the last thing we do is order on those same two fields.
        q = q.order_by(
            self._get_order_text(
                model, order_model, order_field, order)
        ).limit(limit)

        return q

    def _get_order_text(self, model, order_model, order_field, order):
        return text('{order_table_name}_{order_field} {order}, '
                    '{table_name}_{identifier} {order}'.format(
                        table_name=model.__tablename__,
                        identifier=model.__identifier__,
                        order_table_name=order_model.__tablename__,
                        order_field=order_field,
                        order=order))


def init_sqlalchemy():
    engine = create_engine(get_connection_url(settings))
    DBSession.configure(bind=engine, query_cls=PaginateQuery)
    Base.metadata.bind = engine


def get_connection_url(settings_):
    vault = Vault()
    vault_secrets = vault.read('postgres')

    try:
        user = vault_secrets['user']
        password = vault_secrets['password']
    except TypeError:
        try:
            user = settings_['sqlalchemy.user']
            password = settings_['sqlalchemy.password']
        except KeyError:
            log.critical("sqlalchemy.user and/or sqlalchemy.password not "
                         "defined in settings and could not be retrieved from "
                         "Vault")

    return "{driver}://{user}:{password}@{host}/{database}".format(
        driver=settings_['sqlalchemy.driver'],
        user=user,
        password=password,
        host=settings_['sqlalchemy.host'],
        database=settings_['sqlalchemy.database']
    )


def get_tm_session(session_factory, transaction_manager):
    dbsession = session_factory()
    register(dbsession, transaction_manager=transaction_manager)
    return dbsession
