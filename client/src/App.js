import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./App.css";
import { authAxios } from "./utils/axiosUtils";
import { AuthContext } from "./context/authContext";
import CenterLoadingSpinner from "./components/CenterLoadingSpinner/CenterLoadingSpinner";
import { verifyJwtToken } from "./utils/jwtUtils";
import AppRoutes from "./routes/AppRoutes";

const tryAutoLogin = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken && verifyJwtToken(accessToken)) {
    try {
      const res = await authAxios.get("/auth/me/");
      const user = res.data;
      return user;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
};

const App = () => {
  const authContext = useContext(AuthContext);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    tryAutoLogin().then((user) => {
      if (user) {
        setIsLoading(false);
        authContext.setUserDetails(user);
      } else {
        setIsLoading(false);
        history.push("/login/");
      }
    });
    return () => {};
  }, []);

  return (
    <Layout>{isLoading ? <CenterLoadingSpinner /> : <AppRoutes />}</Layout>
  );
};

export default App;
