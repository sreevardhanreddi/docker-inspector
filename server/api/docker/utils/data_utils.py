class DockerContainerParser(object):
    def _get_image_name(self, container_image_tags=[]):
        if container_image_tags:
            return container_image_tags[0]
        return ""

    def _get_port_mapping(self, port_mapping={}):
        formatted_port_maps = {}
        for port in port_mapping:
            formatted_port_maps[port] = None
            if port_mapping[port]:
                formatted_port_maps[port] = [
                    ":".join(address.values()) for address in port_mapping[port]
                ]

        mapping_list = []
        for mapping in formatted_port_maps:
            formatted_port_mapping_string = ""
            if not formatted_port_maps[mapping]:
                mapping_list.append(mapping)
            if formatted_port_maps[mapping]:
                formatted_port_mapping_string = (
                    formatted_port_maps[mapping][0] + "->" + mapping
                )
                mapping_list.append(formatted_port_mapping_string)

        return ", ".join(mapping_list)

    def parse_container(self, container):
        data = {}
        data["container_id"] = container.id
        # data["short_id"] = container.short_id
        data["id"] = container.short_id
        data["status"] = container.status
        data["name"] = container.name
        data["image"] = self._get_image_name(container.image.tags)
        data["ports"] = self._get_port_mapping(container.ports)
        # data["ports"] = container.ports
        return data

    def parse_containers_list(self, containers=[]):
        data = []
        for container in containers:
            data.append(self.parse_container(container))

        return data

    def get_container_top_processes(self, container):
        data = []
        top = container.top()
        processes, titles = top["Processes"], top["Titles"]
        for proc in processes:
            data.append(dict(zip(titles, proc)))

        return data