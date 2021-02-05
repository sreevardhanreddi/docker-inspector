from typing import List, Optional
from datetime import datetime
from enum import Enum
from pydantic import BaseModel


class UserRoleEnum(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class UserCreate(BaseModel):
    email: str
    password: str
    role: UserRoleEnum


class UserToken(BaseModel):
    access_token: str
    token_type: str
    email: str
    role: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserData(BaseModel):
    id: int
    email: str
    username: str
    created_at: datetime
    role: str

    class Config:
        orm_mode = True
