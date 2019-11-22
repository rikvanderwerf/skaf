from pyramid.view import view_config, view_defaults

from skaf.handlers import RequestHandler
from skaf.lib.factories.user import UserFactory
from skaf.lib.middleware.slack.user import SlackUserClient
from skaf.lib.validation.user import UserSchema
from skaf.models.user import User


@view_defaults(renderer='json')
class UserHandler(RequestHandler):
    @view_config(permission='user.get', context=User, request_method='GET')
    def get(self):
        return UserSchema().dump(self.request.context)

    @view_config(permission='user.list', request_method='GET',
                 context=UserFactory)
    def list(self):
        list_result = SlackUserClient(self.request).list(
            self.request.GET.get('cursor'))
        return UserSchema().dump(list_result['members'], many=True)
