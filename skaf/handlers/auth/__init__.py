
import copy
import datetime
import logging

from codercore.db.models.user import get_user_by_email
from pyramid.view import view_config, view_defaults
from pyramid.security import forget, remember
from pyramid.httpexceptions import HTTPOk

from skaf.handlers import RestObject
from skaf.lib.decorators import request_validation_wrapper
from skaf.lib.factories.auth import AuthFactory
from skaf.lib.validation.auth import LoginSchema
from skaf.models import persist, commit, rollback

log = logging.getLogger(__name__)

@view_defaults(context=AuthFactory, renderer='json')
class RESTAuthentication(RestObject):
    @request_validation_wrapper(LoginSchema())
    @view_defaults(permission='login', request_method='POST', name='login')
    def login(self, result):
        _logout(self.request)
        user = get_user_by_email(result['email']).one()
        _login(self.request, user)

    @view_config(request_method='GET', permission='logout', name='logout')
    def logout(self):
        headers = _logout(self.request)
        return HTTPOk(headers=headers)

def _logout(request):
    request.session.invalidate()
    return forget(request)

def _login(request, user):
    headers = remember(request, str(user.id))

    user.last_login = datetime.datetime.now()
    try:
        persist(user)
    except:
        log.critical("something went wrong updating the user login date",
                     exc_info=True)
        rollback()
    finally:
        commit()

    # Continue logging in the user. Being unable to update the login date
    # should not prevent the user from logging in.
    return request.response.headerlist.extend(headers)