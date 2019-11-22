import os

from setuptools import setup

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'VERSION')) as f:
    VERSION = f.read().strip()


requires = [
    'alembic',
    'codercore',
    'marshmallow',
    'pyramid',
    'requests',
    'waitress'
]


setup(
    name='skaf',
    version=VERSION,
    description='skaf',
    author="Code R",
    author_email='hello@coderstudio.nl',
    install_requires=requires,
    entry_points="""
    [paste.app_factory]
    main = skaf:main
    """
)
