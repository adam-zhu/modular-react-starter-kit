import { createModuleSelector } from "Lib/modules";

export const getExampleData = MODULE_KEY => rootState => {
  const exampleDataSelector = createModuleSelector(
    MODULE_KEY,
    state => state.exampleData
  );
  const exampleData = exampleDataSelector(rootState);

  return exampleData;
};
