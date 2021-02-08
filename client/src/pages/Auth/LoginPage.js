import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Paper,
  Card,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { commonAxios } from "./../../utils/axiosUtils";
import { AuthContext } from "../../context/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const authContext = useContext(AuthContext);

  const [loginData, setLoginData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      history.push("/");
    }
    return () => {};
  }, []);

  const onInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    setLoginError(false);
    e.preventDefault();
    setIsLoading(true);
    console.log(loginData);
    commonAxios
      .post("/auth/login/", loginData)
      .then((res) => {
        console.log(res, res.data);
        let data = res.data;
        localStorage.setItem("access_token", data.access_token);
        authContext.setUserDetails(res.data);
        history.push("/containers/");
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response.status === 401 || e.response.status === 422) {
          setLoginError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            elevation={4}
            style={{
              height: "80vh",
              width: "75%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Box>
              <Box m={2}>
                <Typography variant="h4">Login</Typography>
              </Box>
              <Box m={2} />
              <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <Box p={1.6}>
                  <TextField
                    label="Email"
                    variant="standard"
                    name="email"
                    type="email"
                    onChange={onInputChange}
                  />
                </Box>
                <Box p={1.6}>
                  <TextField
                    label="Password"
                    variant="standard"
                    name="password"
                    type="password"
                    onChange={onInputChange}
                  />
                </Box>
                <Box p={0.8}>
                  {loginError ? (
                    <p className="error">Invalid Username or Password</p>
                  ) : null}
                </Box>
                <Box p={0.8}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSubmit}
                    >
                      Login
                    </Button>
                  )}
                </Box>
              </form>
            </Box>
          </Card>
        </Grid>
        <Grid
          item
          sm={6}
          style={{
            height: "100vh",
            backgroundColor: theme.palette.primary.main,
          }}
        ></Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
