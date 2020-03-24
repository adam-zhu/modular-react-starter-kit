import React from "react";
import { DynamicModule } from "Lib/modules";
import ModuleRootComponent from "./components/ROOT";
import ModuleRootReducer from "./reducer";
import ModuleRootSaga from "./sagas";

const MODULE_KEY = "AppShell";

export default ({
  onLoadActions,
  onUnloadActions,
  onMountActions,
  onDismountActions,
  children,
  ...props
}) => (
  <DynamicModule
    MODULE_KEY={MODULE_KEY}
    ModuleRootComponent={ModuleRootComponent}
    ModuleRootReducer={ModuleRootReducer}
    ModuleRootSaga={ModuleRootSaga}
    onLoadActions={onLoadActions}
    onUnloadActions={onUnloadActions}
    onMountActions={onMountActions}
    onDismountActions={onDismountActions}
    children={children}
    {...props}
  />
);
