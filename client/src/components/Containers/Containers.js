import React, { useState, useEffect } from "react";
import { authAxios } from "../../utils/axiosUtils";
import CenterLoadingSpinner from "../CenterLoadingSpinner/CenterLoadingSpinner";
import MUIDataTable from "mui-datatables";

const Containers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    authAxios
      .get("/docker/containers/")
      .then((res) => {
        setContainers(res.data);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });
    return () => {};
  }, []);

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ports",
      label: "Ports",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filter: false,
    selectableRows: true,
    filterType: "dropdown",
    pagination: false,
    responsive: "stacked",
    print: false,
    download: false,
    selectableRowsHeader: false,

    selectableRows: "none",
    // resizableColumns: true,
  };

  return (
    <>
      {isLoading ? (
        <CenterLoadingSpinner />
      ) : (
        <MUIDataTable
          title={"Docker Containers"}
          data={containers}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default Containers;
