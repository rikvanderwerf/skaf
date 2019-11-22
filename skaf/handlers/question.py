import logging

from codercore.db import save, delete
from codercore.lib.settings import settings
from pyramid.httpexceptions import HTTPCreated, HTTPNoContent
from pyramid.view import view_config, view_defaults

from skaf.handlers import RequestHandler
from skaf.lib.decorators import validation_wrapper
from skaf.lib.factories.question import QuestionFactory
from skaf.lib.validation.question import QuestionSchema
from skaf.models.question import Question, list_questions_for_team_id
from skaf.models.user import User, get_user_by_id

log = logging.getLogger(__name__)


@view_defaults(context=QuestionFactory, renderer='json')
class QuestionHandler(RequestHandler):
    def __init__(self, request):
        super().__init__(request)
        self.resolve_points = settings['resolve_points']

    @view_config(permission='question.list', request_method='GET')
    def list(self):
        return QuestionSchema(many=True).dump(
            list_questions_for_team_id(self.request.team_id).all()
        )

    @validation_wrapper(QuestionSchema())
    @view_config(permission='question.post', request_method='POST')
    def post(self, data):
        self.request.response = HTTPCreated()

        _, created_id = save(Question(
            created_by_user_id=self.request.authenticated_userid,
            team_id=self.request.team_id,
            **data
        ))
        self.request.response.location = f"{self.request.url}/{created_id}"

    @view_config(permission='question.get', request_method='GET',
                 context=Question)
    def get(self):
        print("asd")
        return QuestionSchema().dump(self.request.context)

    @validation_wrapper(QuestionSchema(), partial=True)
    @view_config(permission='question.patch', request_method='PATCH',
                 context=Question)
    def patch(self, data):
        if data['resolved_by_user_id']:
            self.resolve(data['resolved_by_user_id'])
        self.request.context.set_fields(data)
        save(self.request.context)

    def resolve(self, resolved_by_user_id):
        resolved_by_user = get_user_by_id(resolved_by_user_id)
        if resolved_by_user:
            resolved_by_user.score = (
                resolved_by_user.score + self.resolve_points)
        else:
            resolved_by_user = User(
                id=resolved_by_user_id,
                team_id=self.request.team_id,
                score=self.resolve_points
            )

        save(resolved_by_user)

    @view_config(permission='question.delete', request_method='DELETE',
                 context=Question)
    def delete(self):
        delete(self.request.context)
        raise HTTPNoContent()
