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

# from skaf.lib.vault import Vault

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
