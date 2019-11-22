from codercore.db import DBSession, Base
from codercore.lib.settings import settings
from sqlalchemy import create_engine


def get_connection_url(settings_):
    return "{driver}://{user}:{password}@{host}/{database}".format(
        driver=settings_['sqlalchemy.driver'],
        user=settings_['sqlalchemy.user'],
        password=settings_['sqlalchemy.password'],
        host=settings_['sqlalchemy.host'],
        database=settings_['sqlalchemy.database']
    )


def init_sqlalchemy():
    engine = create_engine(get_connection_url(settings))
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
