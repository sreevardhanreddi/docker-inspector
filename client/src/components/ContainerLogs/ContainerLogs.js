import React, { useState, useEffect, useRef } from "react";
import { CircularProgress, Paper, Box, Typography } from "@material-ui/core";
import { authAxios } from "../../utils/axiosUtils";
import { useParams } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";

const ContainerLogs = () => {
  const [logs, setLogs] = useState([]);
  const xtermRef = useRef(null);

  const params = useParams();

  let fitAddon = new FitAddon();

  useEffect(() => {
    fitAddon.fit();
    const rws = new ReconnectingWebSocket(
      `ws://${window.location.host}/api/docker/ws/containers/logs/${params.containerName}/`
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
      xtermRef?.current?.terminal.write(`${log}\r\n`);

      setLogs((logs) => {
        return [...logs, log];
      });
      if (logs.length > 100) {
        setLogs([]);
      }

      return;
    };
    return () => {
      rws.close();
    };
  }, []);

  return (
    <>
      <Typography variant="h5">Container Logs </Typography>
      <Box m={2} />
      <Box>
        <XTerm ref={xtermRef} addons={[fitAddon]} onData={(e) => {}} />
      </Box>
    </>
  );
};

export default ContainerLogs;
