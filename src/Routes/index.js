import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import PageLoadingIndicator from "../Shared/components/PageLoadingIndicator";
import { SAGAS as HomeSagas } from "Routes/Home/sagas";
import { SAGAS as AboutSagas } from "Routes/About/sagas";

export const ROUTES = {
  Home: {
    path: "/",
    exact: true,
    Component: lazy(() => import("./Home/module")),
    onMountActions: [
      {
        type: HomeSagas.fetchData.trigger
      }
    ]
  },
  About: {
    path: "/about",
    exact: true,
    Component: lazy(() => import("./About/module")),
    onMountActions: [
      {
        type: AboutSagas.fetchData.trigger
      }
    ]
  }
};

export default () => (
  <Suspense fallback={<PageLoadingIndicator />}>
    <Switch>
      {Object.entries(ROUTES).map(
        ([ROUTE_KEY, { path, exact, Component, ...rest }]) => (
          <Route
            key={ROUTE_KEY}
            path={path}
            exact={exact}
            render={props => <Component {...props} {...rest} />}
          />
        )
      )}
    </Switch>
  </Suspense>
);
