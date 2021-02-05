from datetime import datetime

from api.database import Base
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy import Boolean, Column, DateTime, Integer, String


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(200), unique=True, index=True)
    email = Column(String(200), unique=True, index=True)
    password = Column(String(200))
    is_active = Column(Boolean, unique=False, default=True, server_default="t")
    # ADMIN | USER
    role = Column(String(20), default="USER", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)