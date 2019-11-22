from codercore.db import Base, DBSession as session
from codercore.db.type import UUID
from pyramid.security import Allow
from sqlalchemy import Column, String, Integer, UniqueConstraint



class User(Base):
    __tablename__ = 'user_account'

    id = Column(String(32), primary_key=True)
    firstname = Column(String(64), nullable=False)
    lastname = Column(String(64), nullable=False)
    
        def __acl__(self):
        return ((Allow, f"user:{self.id}", 'user.get'),)

    def set_fields(self, data=None):
        try:
            for key, value in data.items():
                setattr(self, key, value)
        except AttributeError:
            # When data is None AttributeError will be raised
            return


def get_user_by_id(id_):
    return session.query(User).get(id_)
