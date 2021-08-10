from datetime import datetime, timedelta
from typing import List, Optional

from api.database import get_db
from config import ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request, status
from jose import JWTError
from sqlalchemy.orm import Session

from api.auth.auth_helpers import (
    authenticate_user,
    create_access_token,
    decode_access_token,
    get_user_by_email,
    get_users,
    get_user_by_id,
    create_user_in_db,
)
from api.auth.schema import UserCreate, UserData, UserToken, UserLogin
from api.auth.middleware import has_access

auth_router = APIRouter()


@auth_router.post("/create-user/", response_model=UserData)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_in_db(db=db, user=user)


@auth_router.post("/login/", response_model=UserToken)
async def login_for_access_token(
    user_login_creds: UserLogin, db: Session = Depends(get_db)
):
    user = authenticate_user(db, user_login_creds.email, user_login_creds.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"id": user.id}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "email": user.email,
        "username": user.username,
        "role": user.role,
    }


@auth_router.get("/me/", response_model=UserData, dependencies=[Depends(has_access)])
async def get_current_user(request: Request, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        headers = request.headers
        token = headers.get("authorization").split(" ")[1]
        payload = decode_access_token(token)
        user_id = payload.get("id")
        if user_id is None:
            raise credentials_exception
        return get_user_by_id(db, user_id)
    except JWTError:
        raise credentials_exception
    except Exception as e:
        print(e)
        raise credentials_exception


@auth_router.get("/users/", response_model=List[UserData])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_users(db, skip=skip, limit=limit)
    return users
