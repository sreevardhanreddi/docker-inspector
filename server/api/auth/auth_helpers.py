from typing import Optional

from sqlalchemy.orm import Session
from jose import JWTError, jwt
from api.models.users import User
from api.auth.schema import UserCreate
from passlib.context import CryptContext
from datetime import datetime, timedelta
from config import SECRET_KEY, ALGORITHM


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user_in_db(db: Session, user: UserCreate):
    db_user = User(
        email=user.email,
        password=User.generate_hash(user.password),
        username=user.email,
        role=user.role,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db, email: str):
    if db.query(User).filter(User.email == email).first():
        return db.query(User).filter(User.email == email).first()


def get_user_by_id(db, id: str):
    if db.query(User).filter(User.id == id).first():
        return db.query(User).filter(User.id == id).first()


def authenticate_user(db, email: str, password: str):
    user = get_user(db, email)
    if not user:
        return False
    if not User.verify_hash(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload