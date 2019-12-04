import copy
import logging
import transaction

from skaf.models.meta import DBSession as session

log = logging.getLogger(__name__)

def commit():
    log.debug("Committing sessions: %r", session.dirty)
    transaction.commit()

def persist(object):
	log.debug("persisting object %r", object)
	session.add(object)
	session.flush()
	return object

def delete(object):
	log.debug("deleting object %r", object)	
	session.delete(object)

def merge(object):
	log.debug("merging %r", object)
	return session.merge(object)

def rollback():
    log.debug("Rolling back session: %r", session.dirty)
    return session.rollback()


def expire(obj, attrs=None):
    args = (obj,)
    if attrs:
        args = (obj, attrs)
    session.expire(*args)


def save(obj):
    try:
        obj = persist(obj)
        try:
            id_ = obj.id
        except AttributeError:
            id_ = None
        # Shallow copy to be able to return generated data without having
        # to request the object again to get it in session.
        obj_copy = copy.copy(obj)
    except Exception as e:
        log.critical(
            'Something went wrong saving the {}'.format(
                obj.__class__.__name__),
            exc_info=True)
        rollback()
        raise e
    finally:
        commit()

    return obj_copy, id_


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

