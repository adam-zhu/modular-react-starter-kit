import React from "react";
import { Provider } from "react-redux";
import createStore from "Store";
import AppShell from "AppShell/module";
import { SAGAS as AppShellSagas } from "AppShell/sagas";

const RootComponent = () => (
  <div id="RootComponent">
    <React.StrictMode>
      <Provider store={createStore()}>
        <AppShell
          onMountActions={[
            {
              type: AppShellSagas.fetchUser.trigger
            }
          ]}
        />
      </Provider>
    </React.StrictMode>
  </div>
);

export default RootComponent;
