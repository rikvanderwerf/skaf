import configparser
import os

import pkg_resources
from codercore.lib.encrypt import decrypt_secret
from codercore.lib.security import DefaultAuthenticationPolicy, get_principals
from codercore.lib.settings import update_settings
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator

from skaf.db import init_sqlalchemy
from skaf.lib.factories.root import RootFactory
from skaf.lib.security import get_authenticated_user, get_third_party_id

VERSION = pkg_resources.require('skaf')[0].version


def main(global_config, **settings): 
    settings = configure_for_environment(settings)
    init_sqlalchemy()

    authentication_policy = DefaultAuthenticationPolicy(
        secret=decrypt_secret(settings['auth.secret'],
                              settings['aes.key'],
                              settings['aes.iv']),
        timeout=settings.get('auth.timeout'),
        reissue_time=settings.get('auth.reissue_time'),
        callback=get_principals,
        hashalg='sha512',
        parent_domain=True
    )

    config = Configurator(
        settings=settings,
        authentication_policy=authentication_policy,
        authorization_policy=ACLAuthorizationPolicy(),
        root_factory=RootFactory
    )
    config.scan('skaf.handlers')
    config.add_request_method('get_third_party_id', 'third_party_id', 
                              reify=True)
    config.add_request_method('get_authenticated_user', 'user', reify=True)
    config.add_request_method(
        lambda request: get_authenticated_user(request).id,
        'user_id', reify=True)
    return config.make_wsgi_app()


def configure_for_environment(settings):
    settings = update_settings(settings)
    environment = settings['environment']

    here = os.path.dirname(__file__)
    config = configparser.ConfigParser()
    config.read(os.path.join(
        here,
        f"../local-{environment}.ini"
    ))
    settings = update_settings(config['app:main'])

    return settings
