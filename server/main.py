from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
    status,
    WebSocket,
    Cookie,
    Query,
    Request,
)
from fastapi.middleware.cors import CORSMiddleware
from api.docker.views import docker_router
from api.auth.views import auth_router

from api.auth.middleware import has_access

PROTECTED = [Depends(has_access)]

app = FastAPI(root_path="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/app")
def read_main(request: Request):
    return {
        "message": "Hello World",
        "root_path": request.scope.get("root_path"),
        "urls": [{"path": route.path, "name": route.name} for route in app.routes],
    }


app.include_router(auth_router, prefix="/auth", tags=["user auth"])
app.include_router(
    docker_router, prefix="/docker", tags=["docker containers"], dependencies=PROTECTED
)
