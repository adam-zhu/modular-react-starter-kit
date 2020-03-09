import React from "react";
import { DynamicModule } from "Lib/modules";
import createModuleRootReducer from "./reducer";
import createModuleRootSaga, { fetchUserTriggerCreator } from "./sagas";
import AppShellRootComponent from "./components/ROOT";

/*
  @@@@@@@@@@@@@@@@@@@@@@@@@
    AppShell
  @@@@@@@@@@@@@@@@@@@@@@@@@
*/

export const ModuleContext = React.createContext();
export default ({ MODULE_KEY, children, ...props }) => {
  const moduleRootReducer = createModuleRootReducer(MODULE_KEY);
  const moduleRootSaga = createModuleRootSaga(MODULE_KEY);
  const fetchUserTrigger = fetchUserTriggerCreator(MODULE_KEY);
  const onLoadActions = [
    {
      type: fetchUserTrigger
    }
  ];
  const onUnloadActions = [];

  return (
    <ModuleContext.Provider value={MODULE_KEY}>
      <DynamicModule
        MODULE_KEY={MODULE_KEY}
        ModuleRootComponent={AppShellRootComponent}
        ModuleRootReducer={moduleRootReducer}
        ModuleRootSaga={moduleRootSaga}
        onLoadActions={onLoadActions}
        onUnloadActions={onUnloadActions}
        children={children}
        {...props}
      />
    </ModuleContext.Provider>
  );
};
