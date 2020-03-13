import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import createStore from "Store";
import AppShell from "AppShell/module";
import Routes from "Routes";

const RootComponent = () => (
  <div id="RootComponent">
    <Provider store={createStore()}>
      <Router>
        <AppShell MODULE_KEY="GlobalAppShell">
          <Routes />
        </AppShell>
      </Router>
    </Provider>
  </div>
);

export default RootComponent;
