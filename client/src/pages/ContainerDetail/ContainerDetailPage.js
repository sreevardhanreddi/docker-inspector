import React from "react";
import { Container, Box, Paper, Card, Grid } from "@material-ui/core";
import ContainerTopProcesses from "../../components/ContainerTopProcesses/ContainerTopProcesses";
import ContainerInspect from "../../components/ContainerInspect/ContainerInspect";
import ContainerBasicInfo from "../../components/ContainerBasicInfo/ContainerBasicInfo";

const ContainerDetailPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box m={3}>
          <Grid container style={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12}>
              <ContainerBasicInfo />
              <Box p={2} />
            </Grid>
            <Grid item xs={12}>
              <ContainerTopProcesses />
              <Box p={2} />
              <ContainerInspect />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ContainerDetailPage;
