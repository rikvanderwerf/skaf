import uuid

from codercore.db import Base, DBSession as session
from codercore.db.type import UUID
from pyramid.security import Allow
from sqlalchemy import (Column, String, Integer, UniqueConstraint, 
    ForeignKey, Enum)
from sqlalchemy.orm import relationship

from skaf.models.meta import EndpointBase, LineageBase

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

    class ThirdPartyIntegration(Base, EndpointBase, LineageBase):
        __tablename__ = 'third_party_integration'
        __search_fields__ = ('third_party_id')

        id = Column(UUID, primary_key=True, default=uuid.uuid4)
        third_party_id = Column(String(200), unique=True)
        provider = Column(Enum('Facebook', name='third_party_provider'),
                        primary_key=True)
        user_id = Column(UUID, ForeignKey('user.id'))

        user = relationship('User', back_populates='third_party_integrations')

def get_user_by_id(id_):
    return session.query(User).get(id)

def get_user_by_third_party_id(third_party_id, provider):
    return session.query(User).join(User.third_party_integrations).filter(
        and_(ThirdPartyIntegration.third_party_id == third_party_id,
             cast(ThirdPartyIntegration.provider, String()) == provider)
    )

def get_user_by_email(email):
    return session.query(User).where(User.email == email)