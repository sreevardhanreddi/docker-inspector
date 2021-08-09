from typing import List, Optional
from datetime import datetime
from enum import Enum
from pydantic import BaseModel
from pydantic.networks import EmailStr


class UserRoleEnum(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: UserRoleEnum


class UserToken(BaseModel):
    access_token: str
    token_type: str
    email: EmailStr
    role: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserData(BaseModel):
    id: int
    email: EmailStr
    username: str
    created_at: datetime
    role: str

    class Config:
        orm_mode = True
