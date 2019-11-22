from logging.config import fileConfig

from alembic import context
from codercore.lib.alembic import (
    run_migrations_offline as run_offline, run_migrations_online as run_online)
from codercore.lib.settings import update_settings
from codercore.db.models.user import *  # noqa

from skaf.db import get_connection_url

config = context.config
alembic_settings = config.get_section(config.config_ini_section)
update_settings(alembic_settings)

fileConfig(config.config_file_name)


def run_migrations_offline():
    try:
        url = alembic_settings['sqlalchemy.url']
    except KeyError:
        url = get_connection_url(alembic_settings)

    run_offline(url)


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    settings_for_engine = {}

    try:
        settings_for_engine['sqlalchemy.url'] = alembic_settings[
            'sqlalchemy.url']
    except KeyError:
        settings_for_engine['sqlalchemy.url'] = get_connection_url(
            alembic_settings)

    run_online(settings_for_engine)


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
