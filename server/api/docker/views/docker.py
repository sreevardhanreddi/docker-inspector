import json
import docker
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Request, status

docker_router = APIRouter()

client = docker.DockerClient(base_url="unix:///var/run/docker.sock")


@docker_router.get("/containers")
def containers():
    containers = client.containers.list()
    containers = [
        {
            "id": container.id,
            "short_id": container.short_id,
            "status": container.status,
            "name": container.name,
            "image": container.image.tags[0],
            "ports": container.ports,
        }
        for container in containers
    ]
    return containers
