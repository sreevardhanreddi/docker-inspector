import json
import docker
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Request, status
from api.docker.utils.data_utils import DockerContainerParser

docker_router = APIRouter()

client = docker.DockerClient(base_url="unix:///var/run/docker.sock")


@docker_router.get("/containers/")
def containers():
    containers = client.containers.list(all=True)
    container_parser = DockerContainerParser()
    containers = container_parser.parse_containers_list(containers)
    return containers


@docker_router.get("/containers/{container_name}")
def container(container_name: str):
    containers = client.containers.list(all=True, filters={"name": container_name})
    if not containers:
        raise HTTPException(status_code=404)
    container_parser = DockerContainerParser()
    container = container_parser.parse_container(containers[0])
    return container
