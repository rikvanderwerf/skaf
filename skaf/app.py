from flask import Flask
from flask_graphql import GraphQLView

from skaf.models import db_session
from skaf.schema import schema, Department

from skaf.db import init_sqlalchemy

app = Flask(__name__)
app.debug = True

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # for having the GraphiQL interface
    )
)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    init_sqlalchemy()
    app.run()