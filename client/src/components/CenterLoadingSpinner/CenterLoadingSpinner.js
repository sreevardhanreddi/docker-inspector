import React from "react";
import { Container, CircularProgress } from "@material-ui/core";

const CenterLoadingSpinner = () => {
    return (
        <>
            <Container
                style={{
                    display: "flex",
                    height: "75vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Container>
        </>
    );
};

export default CenterLoadingSpinner;