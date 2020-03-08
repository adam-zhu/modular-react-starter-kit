import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import createStore from "./store";
import GlobalAppShell from "./GLOBAL/module";
import Routes from "./Routes";

const RootComponent = () => (
  <div id="RootComponent">
    <Provider store={createStore()}>
      <Router>
        <GlobalAppShell>
          <Routes />
        </GlobalAppShell>
      </Router>
    </Provider>
  </div>
);

export default RootComponent;
