import React, { useState, useEffect } from "react";
import ReactJson from "react-json-view";
import { CircularProgress, Paper, Box, Typography } from "@material-ui/core";
import { authAxios } from "../../utils/axiosUtils";
import { useParams } from "react-router-dom";

const ContainerInspect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inspectJSON, setInspectJSON] = useState({});

  const params = useParams();

  const getInspectJSON = () => {
    setIsLoading(true);
    authAxios
      .get(`docker/containers/inspect/${params.containerName}/`)
      .then((res) => {
        let data = res.data;
        setInspectJSON(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getInspectJSON();

    return () => {};
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            <Paper elevation={4}>
              <Box p={1}>
                <Typography variant="h5">Docker inspect</Typography>
              </Box>
              <Box p={0.4} />
              <ReactJson
                src={inspectJSON}
                theme="monokai"
                collapsed="1"
                displayDataTypes={false}
              />
            </Paper>
          </Box>
        </>
      )}
    </>
  );
};

export default ContainerInspect;
