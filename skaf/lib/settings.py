import configparser
import os

settings = dict()


def update_settings(settings_):
    settings_ = _set_environment_variables(settings_)
    settings.update(settings_)
    return settings


def _set_environment_variables(settings_):
    """Interpolates any environment variables if present."""

    settings_with_env_vars = {}
    for key, value in settings_.items():
        try:
            settings_with_env_vars[key] = os.path.expandvars(value)
        except TypeError:
            settings_with_env_vars[key] = value
    return settings_with_env_vars

def configure_for_environment(settings = dict()):
    settings = update_settings(settings)
    here = os.path.dirname(__file__)
    config = configparser.ConfigParser()
    config.read(os.path.join(here, '../../local-develop.ini'))
    settings = update_settings(config['app:main'])
    config.read(os.path.join(here, '../../develop.ini'))
    settings = update_settings(config['app:main'])
    return settings