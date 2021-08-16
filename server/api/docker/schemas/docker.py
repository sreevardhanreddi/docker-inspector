from typing import List, Optional
from datetime import datetime
from enum import Enum
from pydantic import BaseModel
from pydantic.networks import EmailStr


class DockerContainerSchema(BaseModel):
    container_id: str
    id: str
    status: str
    name: str
    image: str
    ports: str


class DockerContainerTopSchema(BaseModel):
    UID: str
    PID: str
    PPID: str
    C: str
    STIME: str
    TTY: str
    TIME: str
    CMD: str
