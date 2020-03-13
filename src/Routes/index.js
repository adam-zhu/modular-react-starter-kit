import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import PageLoadingIndicator from "../Shared/components/PageLoadingIndicator";

export const ROUTES = {
  HOME: {
    path: "/",
    exact: true,
    Component: lazy(() => import("./Home/module"))
  },
  ABOUT: {
    path: "/about",
    exact: true,
    Component: lazy(() => import("./About/module"))
  }
};

export default () => (
  <Suspense fallback={<PageLoadingIndicator />}>
    <Switch>
      {Object.entries(ROUTES).map(([ROUTE_KEY, { path, exact, Component }]) => (
        <Route
          key={ROUTE_KEY}
          path={path}
          exact={exact}
          render={props => (
            <Component MODULE_KEY={`ROUTE_${ROUTE_KEY}`} {...props} />
          )}
        />
      ))}
    </Switch>
  </Suspense>
);
