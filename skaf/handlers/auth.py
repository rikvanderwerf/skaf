import logging

from codercore.db import save
from pyramid.httpexceptions import HTTPBadRequest, HTTPServerError
from pyramid.security import remember
from pyramid.view import view_config, view_defaults

from skaf.handlers import RequestHandler
from skaf.lib.decorators import validation_wrapper
from skaf.lib.factories.auth import AuthFactory
from skaf.lib.middleware.slack.exceptions import BadRequest, ServerError
from skaf.lib.middleware.slack.oauth import SlackOAuthClient
from skaf.lib.validation.auth import AuthSchema
from skaf.models.bot import put_bot_access_token
from skaf.models.user import User, get_user_by_id

log = logging.getLogger(__name__)


@view_defaults(context=AuthFactory, renderer='json')
class Authentication(RequestHandler):
    @validation_wrapper(AuthSchema())
    @view_config(permission='login', request_method='POST', name='login')
    def login(self, data):
        try:
            slack_response = SlackOAuthClient(self.request).get_access_token(
                data['code'])
        except BadRequest as e:
            raise HTTPBadRequest(body=str(e))
        except ServerError as e:
            raise HTTPServerError(str(e))

        team = slack_response['team']
        user_id = slack_response['authed_user']['id']

        if slack_response['token_type'] == 'bot':
            self.store_bot_token(
                slack_response['bot_user_id'],
                team,
                slack_response['access_token']
            )

        self.store_user(user_id, team)

        return self.request.response.headerlist.extend(
            remember(self.request, user_id)
        )

    def store_bot_token(self, bot_id, team, access_token):
        put_bot_access_token(bot_id, team['id'], access_token)

    def store_user(self, user_id, team):
        if get_user_by_id(user_id):
            # Nothing to do
            return

        save(User(
            id=user_id,
            team_id=team['id']
        ))
