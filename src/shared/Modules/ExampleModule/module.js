import React from "react";
import { DynamicModule } from "Lib/modules";
import createModuleRootReducer from "./reducer";
import createModuleRootSaga, { fetchExampleDataTriggerCreator } from "./sagas";
import ExampleModuleRootComponent from "./components/ROOT";

/*
  @@@@@@@@@@@@@@@@@@@@@@@@@
    ExampleModule
  @@@@@@@@@@@@@@@@@@@@@@@@@
*/

export const ModuleContext = React.createContext();
export default ({ MODULE_KEY, children, ...props }) => {
  const moduleRootReducer = createModuleRootReducer(MODULE_KEY);
  const moduleRootSaga = createModuleRootSaga(MODULE_KEY);
  const fetchExampleDataTrigger = fetchExampleDataTriggerCreator(MODULE_KEY);
  const onLoadActions = [
    {
      type: fetchExampleDataTrigger
    }
  ];
  const onUnloadActions = [];

  return (
    <ModuleContext.Provider value={MODULE_KEY}>
      <DynamicModule
        MODULE_KEY={MODULE_KEY}
        ModuleRootComponent={ExampleModuleRootComponent}
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
