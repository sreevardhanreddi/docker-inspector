def get_image_name(container_image_tags=[]):
    if container_image_tags:
        return container_image_tags[0]
    return ""


def get_port_mapping(port_mapping={}):

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


def parse_containers(containers=[]):
    data = []
    for container in containers:
        temp = {}
        temp["id"] = container.id
        # temp["short_id"] = container.short_id
        temp["id"] = container.short_id
        temp["status"] = container.status
        temp["name"] = container.name
        temp["image"] = get_image_name(container.image.tags)
        temp["ports"] = get_port_mapping(container.ports)
        # temp["ports"] = container.ports
        data.append(temp)

    return data