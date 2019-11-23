import logging
import os

import pkg_resources
from codercore.lib.settings import settings
from pyramid.view import view_config

from skaf import VERSION
from skaf.lib.factories.root import RootFactory

log = logging.getLogger(__name__)


@view_config(context=RootFactory,
             permission='public',
             renderer='json',
             request_method='GET')
def root_view(request):
    return {
        'skaf': {
            'version': VERSION
        },
        'environment': settings['environment']
    }
