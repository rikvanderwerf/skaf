import uuid

from codercore.db import Base, DBSession as session
from codercore.db.models.user import BaseUser
from codercore.db.type import UUID
# from pyramid.security import Allow
from sqlalchemy import (Column, String, Integer, UniqueConstraint, 
    ForeignKey, Enum, cast, and_)
from sqlalchemy.orm import relationship

from skaf.models.meta import EndpointBase, LineageBase, PaginateQuery

import datetime
import uuid

from sqlalchemy import Column, DateTime, String

from codercore.db import Base, DBSession as session
from codercore.db.type import UUID

class User(BaseUser):
    __ownername__ = 'user'
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id = kwargs.pop('id', uuid.uuid4())

    firstname = Column(String(100))
    lastname = Column(String(100))
    email = Column(String(500), nullable=False)
    password_hash = Column(String(119), nullable=False)
    password_salt = Column(String(29), nullable=False)
    date_created = Column(DateTime, default=datetime.datetime.utcnow,
                          nullable=False)

    def set_fields(self, data=None):
        try:
            for key, value in data.items():
                setattr(self, key, value)
        except AttributeError:
            # When data is None AttributeError will be raised
            return
           