import React from "react";
import { DynamicModuleLoader } from "redux-dynamic-modules-react";
import ModuleRootReducer from "./reducer";
import ModuleRootSaga, { TRIGGER_fetchUser, TRIGGER_fetchUser2 } from "./sagas";
import ModuleRootComponent from "./components/ROOT";

const BASE_CONFIG = {
  id: "GLOBAL",
  initialActions: [{ type: TRIGGER_fetchUser }, { type: TRIGGER_fetchUser2 }], // actions to dispatch on module load
  finalActions: [] // actions to dispatch on module unload
};

export const MODULE_CONFIG = {
  ...BASE_CONFIG,
  reducerMap: {
    [BASE_CONFIG.id]: ModuleRootReducer
  },
  sagas: [ModuleRootSaga]
};

export default ({ children }) => (
  <DynamicModuleLoader modules={[MODULE_CONFIG]}>
    <ModuleRootComponent>{children}</ModuleRootComponent>
  </DynamicModuleLoader>
);
