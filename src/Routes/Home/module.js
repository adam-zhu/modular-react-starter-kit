import React from "react";
import { DynamicModule } from "Lib/modules";
import createReducer from "./reducer";
import initModuleSagas from "./sagas";
import HomeModuleRootComponent from "./components/ROOT";

/*
  @@@@@@@@@@@@@@@@@@@@@@@@@
    Home (route)
  @@@@@@@@@@@@@@@@@@@@@@@@@
*/

export const ModuleContext = React.createContext();
export default ({ MODULE_KEY, children, ...props }) => {
  const moduleRootReducer = createReducer(MODULE_KEY);
  const { rootSaga, triggers } = initModuleSagas(MODULE_KEY);
  const onLoadActions = [
    {
      type: triggers.fetchData
    }
  ];
  const onUnloadActions = [];

  return (
    <ModuleContext.Provider value={{ MODULE_KEY, triggers }}>
      <DynamicModule
        MODULE_KEY={MODULE_KEY}
        ModuleRootComponent={HomeModuleRootComponent}
        ModuleRootReducer={moduleRootReducer}
        ModuleRootSaga={rootSaga}
        onLoadActions={onLoadActions}
        onUnloadActions={onUnloadActions}
        children={children}
        {...props}
      />
    </ModuleContext.Provider>
  );
};
