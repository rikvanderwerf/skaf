

@view_defaults(context=AuthFactory, renderer='json')
class Authentication(RestObject):

    @request_validation_wrapper(LoginSchema(strict=True))
    @view_config(permission='login', request_method='POST', name='login')
    def login(self, result):
        """
        this handles the login, to make sure the session is fresh
        we force logout first.
        """
        logout(self.request)

        user = get_user_by_email(email=result['email']).one()

        return _login(self.request, user)

    @view_config(request_method='GET', permission='logout', name='logout')
    def logout(self):
        headers = logout(self.request)
        return HTTPOk(headers=headers)
