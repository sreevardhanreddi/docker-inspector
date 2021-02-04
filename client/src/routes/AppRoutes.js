import React, { lazy, Suspense } from "react";

import { Switch, Route } from "react-router-dom";
import CenterLoadingSpinner from "../components/CenterLoadingSpinner/CenterLoadingSpinner";
import ContainerListPage from "../pages/Containers/ContainerListPage";

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<CenterLoadingSpinner />}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <ContainerListPage {...props} />}
          />
          <Route component={<ContainerListPage />} />
        </Switch>
      </Suspense>
    </>
  );
};

export default AppRoutes;
