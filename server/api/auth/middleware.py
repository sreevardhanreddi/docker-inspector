from jose import jwt
from jose.exceptions import JOSEError
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBasicCredentials, HTTPBearer
from config import SECRET_KEY, ALGORITHM

security = HTTPBearer()


async def has_access(credentials: HTTPBasicCredentials = Depends(security)):
    """
    Function that is used to validate the token in the case that it requires it
    """
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            key=SECRET_KEY,
            options={
                "verify_signature": False,
                "verify_aud": False,
                "verify_iss": False,
            },
        )
        print("payload => ", payload)
    except JOSEError as e:  # catches any exception
        print(e)
        raise HTTPException(status_code=401, detail=str(e))
