
import copy
import datetime

from pyramid.view import view_config, view_defaults
from pyramid.security import forget, remember
from pyramid.httpexceptions import HTTPOk

from skaf.handlers import RestObject
from skaf.lib.decorators import request_validation_wrapper
from skaf.lib.factories.auth import AuthFactory
from skaf.models import persist, commit, rollback
from skaf.models.user import get_user_by_email

@view_defaults(context=AuthFactory, renderer='json')
class Authentication(RestObject):

    # @request_validation_wrapper(LoginSchema())
    # @view_defaults(permission='login', request_method='POST', name='login')
    # def login(self, result):
    #     _logout(self.request)
    #     user = get_user_by_email(result['email']).one()

    @view_config(request_method='GET', permission='logout', name='logout')
    def logout(self):
        headers = _logout(self.request)
        return HTTPOk(headers=headers)

def _logout(request):
    request.session.invalidate()
    return forget(request)