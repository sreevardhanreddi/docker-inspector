import React from "react";
import Containers from "../../components/Containers/Containers";
import { Container, Box, Card } from "@material-ui/core";

const ContainerListPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box m={1.6}>
          <Containers />
        </Box>
      </Container>
    </>
  );
};

export default ContainerListPage;
