from pyramid.view import view_config, view_defaults

from skaf.handlers import RestObject
from skaf.lib.factories.user import UserFactory
from skaf.lib.validation.user import UserSchema
from skaf.models.user import User

@view_defaults(containment=UserFactory, context=UserFactory,
               renderer='json')
class RESTUser(RestObject):
    
    @view_config(permission='user.get', context=User, request_method="GET")
    def get(self):
      return UserSchema().dump(self.request.context).data
    
    
    def post_third_party(self, result):
      pass