import React, { useState, useEffect } from "react";
import { authAxios } from "../../utils/axiosUtils";
import CenterLoadingSpinner from "../CenterLoadingSpinner/CenterLoadingSpinner";
import MUIDataTable from "mui-datatables";
import { useHistory, useParams } from "react-router-dom";

const ContainerTop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [container, setContainer] = useState({});

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    authAxios
      .get(`/docker/containers/${params.containerName}`)
      .then((res) => {
        debugger;
        setContainer(res.data);
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
    onRowClick: (dataIndex, rowIndex) => {
      history.push(`/containers/${dataIndex[2]}`);
    },
    // resizableColumns: true,
  };

  debugger;

  return (
    <>
      {isLoading ? (
        <CenterLoadingSpinner />
      ) : (
        <>
          <p>{JSON.stringify(container)}</p>
          <MUIDataTable
            title={"Docker Containers"}
            data={[]}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  );
};

export default ContainerTop;
