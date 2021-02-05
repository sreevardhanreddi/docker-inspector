import React, { lazy, Suspense } from "react";

import { Switch, Route } from "react-router-dom";
import CenterLoadingSpinner from "../components/CenterLoadingSpinner/CenterLoadingSpinner";
import LoginPage from "../pages/Auth/LoginPage";
import ContainerDetailPage from "../pages/ContainerDetail/ContainerDetailPage";
import ContainerListPage from "../pages/Containers/ContainerListPage";

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<CenterLoadingSpinner />}>
        <Switch>
          <Route
            exact
            path="/containers"
            render={(props) => <ContainerListPage {...props} />}
          />
          <Route
            exact
            path="/containers/:containerName"
            render={(props) => <ContainerDetailPage {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <LoginPage {...props} />}
          />
          <Route render={(props) => <ContainerListPage {...props} />} />
        </Switch>
      </Suspense>
    </>
  );
};

export default AppRoutes;
