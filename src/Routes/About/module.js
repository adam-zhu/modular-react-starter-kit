import React from "react";
import { DynamicModuleLoader } from "redux-dynamic-modules-react";
import ModuleRootReducer from "./reducer";
import ModuleRootSaga, { TRIGGER_fetchData } from "./sagas";
import ModuleRootComponent from "./components/ROOT";

const BASE_CONFIG = {
  id: "About",
  initialActions: [{ type: TRIGGER_fetchData }], // actions to dispatch on module load
  finalActions: [] // actions to dispatch on module unload
};

export const MODULE_CONFIG = {
  ...BASE_CONFIG,
  reducerMap: {
    [BASE_CONFIG.id]: ModuleRootReducer
  },
  sagas: [ModuleRootSaga]
};

export default () => (
  <DynamicModuleLoader modules={[MODULE_CONFIG]}>
    <ModuleRootComponent />
  </DynamicModuleLoader>
);
