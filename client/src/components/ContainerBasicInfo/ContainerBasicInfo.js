import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CircularProgress, Typography, Box } from "@material-ui/core";
import { authAxios } from "../../utils/axiosUtils";

const ContainerBasicInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [container, setContainer] = useState({});

  const history = useHistory();
  const params = useParams();

  const getContainerInfo = () => {
    setIsLoading(true);

    authAxios
      .get(`/docker/containers/${params.containerName}/`)
      .then((res) => {
        setContainer(res.data);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getContainerInfo();
    return () => {};
  }, []);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {/* <p>{JSON.stringify(container)}</p> */}
          <Box>
            <Typography variant="h5">{container.name}</Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default ContainerBasicInfo;
