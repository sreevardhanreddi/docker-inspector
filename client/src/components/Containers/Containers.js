import React, { useState, useEffect } from "react";
import { authAxios } from "../../utils/axiosUtils";
import CenterLoadingSpinner from "../CenterLoadingSpinner/CenterLoadingSpinner";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

const Containers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [containers, setContainers] = useState([]);

  const history = useHistory();

  const getContainers = () => {
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
  };

  useEffect(() => {
    getContainers();
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
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ports",
      label: "Ports",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
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
    onRowClick: (dataIndex, rowIndex) => {
      history.push(`/containers/${dataIndex[2]}/`);
    },
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
