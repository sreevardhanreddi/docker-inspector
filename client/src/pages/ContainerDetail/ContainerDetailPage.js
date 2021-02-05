import React from "react";
import { Container, Box, Card } from "@material-ui/core";
import ContainerTop from "../../components/ContainerTop/ContainerTop";

const ContainerDetailPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box m={1.6}>
          <ContainerTop />
        </Box>
      </Container>
    </>
  );
};

export default ContainerDetailPage;
