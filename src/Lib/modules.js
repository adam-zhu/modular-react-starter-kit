import React from "react";
import { DynamicModuleLoader } from "redux-dynamic-modules-react";
import { spawn } from "redux-saga/effects";
import { createSelector } from "reselect";

export const DynamicModule = ({
  MODULE_KEY,
  ModuleRootComponent,
  ModuleRootReducer,
  ModuleRootSaga,
  onLoadActions,
  onUnloadActions,
  children,
  ...props
}) => {
  const moduleConfig = {
    id: MODULE_KEY,
    reducerMap: {
      [MODULE_KEY]: ModuleRootReducer
    },
    sagas: [ModuleRootSaga],
    initialActions: onLoadActions,
    finalActions: onUnloadActions
  };

  return (
    <DynamicModuleLoader modules={[moduleConfig]}>
      <ModuleRootComponent MODULE_KEY={MODULE_KEY} {...props}>
        {children}
      </ModuleRootComponent>
    </DynamicModuleLoader>
  );
};

export const createTriggerCreator = triggerKey => MODULE_KEY =>
  `${MODULE_KEY}/TRIGGER_SAGA_${triggerKey}`;

export const createSagaListener = (takeFn, trigger, saga) =>
  spawn(function*() {
    yield takeFn(trigger, saga);
  });

export const createModuleSelector = (MODULE_KEY, ...selectors) =>
  createSelector(rootState => rootState[MODULE_KEY], ...selectors);
