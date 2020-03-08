import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import PageLoadingIndicator from "../shared/components/PageLoadingIndicator";

export const ROUTES = {
  HOME: {
    path: "/",
    exact: true,
    component: lazy(() => import("./Home/module"))
  },
  ABOUT: {
    path: "/about",
    exact: true,
    component: lazy(() => import("./About/module"))
  }
};

export default () => (
  <Suspense fallback={<PageLoadingIndicator />}>
    <Switch>
      {Object.entries(ROUTES).map(([ROUTE_KEY, { path, exact, component }]) => (
        <Route
          key={ROUTE_KEY}
          path={path}
          exact={exact}
          component={component}
        />
      ))}
    </Switch>
  </Suspense>
);
