import json
import docker
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Request, status
from api.docker.utils.data_utils import parse_containers

docker_router = APIRouter()

client = docker.DockerClient(base_url="unix:///var/run/docker.sock")


@docker_router.get("/containers")
def containers():
    containers = client.containers.list(all=True)
    containers = parse_containers(containers)
    return containers
