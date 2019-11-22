from pyramid.view import view_config

from skaf import VERSION
from skaf.lib.factories.root import RootFactory


@view_config(context=RootFactory, permission='public', renderer='json',
             request_method='GET')
def root_view(request):
    print(request)
    return {
        'version': VERSION
    }
