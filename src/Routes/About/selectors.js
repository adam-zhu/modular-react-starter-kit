import { createModuleSelector } from "Lib/modules";

export const getData = MODULE_KEY => rootState => {
  const dataSelector = createModuleSelector(MODULE_KEY, state => state.data);
  const data = dataSelector(rootState);

  return data;
};
