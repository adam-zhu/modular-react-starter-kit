import React from "react";
import { DynamicModuleLoader } from "redux-dynamic-modules-react";
import { all, spawn } from "redux-saga/effects";
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
      <ModuleRootComponent {...props}>{children}</ModuleRootComponent>
    </DynamicModuleLoader>
  );
};

const attachSagaListener = ({ take, trigger, saga }) => {
  return spawn(function*() {
    yield take(trigger, saga);
  });
};

export const createRootSaga = sagaAttachments => {
  const sagaListeners = Object.values(sagaAttachments);

  return function*() {
    yield all(sagaListeners.map(attachSagaListener));
  };
};

export const getSagaTriggers = sagaAttachments =>
  Object.fromEntries(
    Object.entries(sagaAttachments).map(([key, { take, trigger, saga }]) => [
      key,
      trigger
    ])
  );

export const createModuleSelector = (MODULE_KEY, ...selectors) =>
  createSelector(rootState => rootState[MODULE_KEY], ...selectors);
