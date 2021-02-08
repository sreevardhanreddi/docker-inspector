import React, { useState, useEffect } from "react";
import { authAxios } from "../../utils/axiosUtils";
import CenterLoadingSpinner from "../CenterLoadingSpinner/CenterLoadingSpinner";
import MUIDataTable from "mui-datatables";
import { useHistory, useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const ContainerTop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [containerTop, setContainerTop] = useState([]);

  const history = useHistory();
  const params = useParams();

  const getContainerTop = () => {
    setIsLoading(true);
    authAxios
      .get(`/docker/containers/top/${params.containerName}/`)
      .then((res) => {
        setContainerTop(res.data);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getContainerTop();
    return () => {};
  }, []);

  const columns = [
    {
      name: "UID",
      label: "UID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "PID",
      label: "PID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "PPID",
      label: "PPID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "C",
      label: "C",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "STIME",
      label: "STIME",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TTY",
      label: "TTY",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TIME",
      label: "TIME",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "CMD",
      label: "CMD",
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
    // resizableColumns: true,
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {/* <p>{JSON.stringify(containerTop)}</p> */}
          <MUIDataTable
            title={"Container Top Processes"}
            data={containerTop}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  );
};

export default ContainerTop;
