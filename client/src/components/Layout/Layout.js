import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Navbar from "./../Navbar/Navbar";
import { Container, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LoginPage from "../../pages/Auth/LoginPage";

const Layout = (props) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  return (
    <>
      {authContext.isAuthenticated ? <Navbar /> : null}
      {props.children}
    </>
  );
};

export default Layout;
