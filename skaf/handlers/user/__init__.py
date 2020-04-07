# from pyramid.httpexceptions import HTTPCreated
# from pyramid.view import view_config, view_defaults

# from skaf.handlers import RestObject
# from skaf.lib.decorators import request_validation_wrapper
# from skaf.lib.factories.user import UserFactory, RegisterFactory
# from skaf.lib.validation.user import UserSchema
# from skaf.models.user import User

# @view_defaults(containment=UserFactory, context=UserFactory,
#                renderer='json')
# class RESTUser(RestObject):
    
#     @view_config(permission='user.get', context=User, request_method="GET")
#     def get(self):
#       return UserSchema().dump(self.request.context).data

#     @view_config(context=RegisterFactory, request_method='POST')
#     @view_config(permission='user.post', request_method='POST')
#     def post(self, result):
#         self.request.response = HTTPCreated()
#         user = User(**result)
#         raise self.request.response