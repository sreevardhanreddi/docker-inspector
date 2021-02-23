import React, { useState, useEffect } from "react";
import { CircularProgress, Paper, Box, Typography } from "@material-ui/core";
import { authAxios } from "../../utils/axiosUtils";
import { useParams } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";

const ContainerLogs = () => {
  const [logs, setLogs] = useState([]);

  const params = useParams();

  useEffect(() => {
    // getInspectJSON();
    const rws = new WebSocket(
      `ws://${window.location.host}/ws/api/docker/ws/containers/logs/${params.containerName}/`
    );
    rws.onopen = (e) => {
      console.log("on open", e);
    };
    rws.onclose = (e) => {
      console.log("on close", e);
      rws.close(3000);
    };
    rws.onerror = (e) => {
      console.log("on error", e);
    };
    rws.onmessage = (e) => {
      console.log("on message", e.data);
      let log = JSON.parse(e.data).log;
      setLogs((logs) => {
        return [...logs, log];
      });
      if (logs.length > 50) {
        setLogs([]);
        return;
      }
    };
    return () => {
      rws.close();
    };
  }, []);

  return (
    <>
      <Typography variant="h5">Container Logs ({logs.length})</Typography>
      <Box m={2} />
      {/* {logs.length} */}
      {/* <Typography>{logs}</Typography> */}
      <Box style={{ height: "30vh", overflow: "auto" }}>
        {logs.map((log, index) => {
          // console.log(log, index);
          return <Box key={index}>{log}</Box>;
        })}
      </Box>
    </>
  );
};

export default ContainerLogs;
