import asyncio
import json
import docker
import aiodocker
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Request, status
from starlette.endpoints import WebSocketEndpoint
from starlette.websockets import WebSocket
from api.docker.utils.data_utils import DockerContainerParser
from api.docker.schemas.docker import DockerContainerSchema, DockerContainerTopSchema

docker_router = APIRouter()

client = docker.DockerClient(base_url="unix:///var/run/docker.sock")
aio_docker_client = aiodocker.Docker()


@docker_router.get("/containers/", response_model=List[DockerContainerSchema])
def containers():
    containers = client.containers.list(all=True)
    container_parser = DockerContainerParser()
    containers = container_parser.parse_containers_list(containers)
    return containers


@docker_router.get(
    "/containers/{container_name}/", response_model=DockerContainerSchema
)
def container(container_name: str):
    containers = client.containers.list(all=True, filters={"name": container_name})
    if not containers:
        raise HTTPException(status_code=404)
    container_parser = DockerContainerParser()
    container = container_parser.parse_container(containers[0])
    return container


@docker_router.get("/containers/inspect/{container_name}/")
def container_inspect_info(container_name: str):
    containers = client.containers.list(all=True, filters={"name": container_name})
    if not containers:
        raise HTTPException(status_code=404)
    api_client = docker.APIClient()
    container_info = api_client.inspect_container(containers[0].id)
    return container_info


@docker_router.get(
    "/containers/top/{container_name}/", response_model=List[DockerContainerTopSchema]
)
def container_top_processes(container_name: str):
    containers = client.containers.list(all=True, filters={"name": container_name})
    if not containers:
        raise HTTPException(status_code=404)
    container_top = DockerContainerParser().get_container_top_processes(containers[0])
    return container_top


@docker_router.websocket_route("/ws/containers/logs/{container_name}/")
class WebSocketContainerLogs(WebSocketEndpoint):

    encoding = "json"

    async def on_connect(self, websocket: WebSocket):
        await websocket.accept()
        container_name = websocket.path_params.get("container_name")
        self.connected = True
        self.websocket = websocket
        self.container = await aio_docker_client.containers.get(container_name)
        self.logs = self.container.log(
            stdout=True,
            stderr=True,
            follow=True,
            # tail=10,
        )
        # self.ticker_task = asyncio.create_task(self.stream_logs())
        async for log in self.logs:
            log_data = {"log": log.strip("\n")}
            await self.websocket.send_json(log_data)

    # async def stream_logs(self):
    #     print("in stream logs")
    #     async for log in self.logs:
    #         # log = yield (log)
    #         log_data = {"log": log.decode().strip("\n")}
    #         print(log_data)
    #         await self.websocket.send_json(log_data)

    # async def on_receive(self, websocket: WebSocket, data: dict):
    #     channel: str = data.get("channel")
    #     TODO: handle input and other logic here

    async def on_disconnect(self, websocket, close_code: int):
        self.connected = False
        # self.ticker_task.cancel()
        await websocket.close()
