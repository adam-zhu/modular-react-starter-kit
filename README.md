This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React/Redux Modules

Build UI using "modules". Modules are just React components that do special stuff when they are mounted or unmounted by the React engine. The things that modules do are:

- mount/unmount a reducer onto the global redux store
- install/uninstall any redux middlewares
- dispatch redux actions
- render

The utilities for creating a module are:
```
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
```

[`<DynamicModuleLoader />` comes from `redux-dynamic-modules`](https://github.com/microsoft/redux-dynamic-modules).

Advantages of this method are that UI can be built by assembling entirely isolated components without sacrificing global control. Modules can be generally 1:1 with product features, and all code for a given product feature can be colocated within the module. Modules are React components, and when they are mounted or unmounted by the React DOM they set up and manage all of their dependencies in the background. When a module is declared as part of a React component's render content, it is passed a `MODULE_KEY` which is both the global Redux store key its reducer is keyed under and also the prefix for all its action types.

Because the React DOM is the top-level controller of what is loaded and what is not, if a module is mounted to the React DOM then we have access to its state through its `MODULE_KEY`. We can then use this to expose any exterior interactions against the module's state from elsewhere in the application. Modules do not need to know about any parent context and can ask for any data they need to be passed in at mount time. With the use of a dynamic loading technique such as `React.lazy` or `react-loadable`, modules can be easily codesplit and dynamically loaded at runtime.

Here is an example module declaration:
```
[ModuleName]
|__ components
    |__ ROOT.js
|__ module.js
|__ reducer.js
|__ sagas.js
|__ selectors.js
|__ services.js
```
```
// module.js

import React from "react";
import { DynamicModule } from "Lib/modules";
import createReducer from "./reducer";
import initModuleSagas from "./sagas";
import ExampleModuleRootComponent from "./components/ROOT";

/*
  @@@@@@@@@@@@@@@@@@@@@@@@@
    ExampleModule
  @@@@@@@@@@@@@@@@@@@@@@@@@
*/

export const ModuleContext = React.createContext();
export default ({ MODULE_KEY, children, ...props }) => {
  const moduleRootReducer = createReducer(MODULE_KEY);
  const { rootSaga, triggers } = initModuleSagas(MODULE_KEY);
  const onLoadActions = [
    {
      type: triggers.fetchExampleData
    }
  ];
  const onUnloadActions = [];

  return (
    <ModuleContext.Provider value={{ MODULE_KEY, triggers }}>
      <DynamicModule
        MODULE_KEY={MODULE_KEY}
        ModuleRootComponent={ExampleModuleRootComponent}
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
```
```
// reducer.js

const initialState = {
  exampleData: undefined
};

export const createActionTypes = MODULE_KEY => ({
  SET_EXAMPLE_DATA: `${MODULE_KEY}/ExampleModule/set_example_data`
});

const createReducer = MODULE_KEY => (state = initialState, action) => {
  const actionTypes = createActionTypes(MODULE_KEY);

  switch (action.type) {
    case actionTypes.SET_EXAMPLE_DATA:
      return {
        ...state,
        exampleData: action.payload
      };

    default:
      return state;
  }
};

export default createReducer;
```
```
// sagas.js

import { call, put, takeEvery } from "redux-saga/effects";
import { createRootSaga, getSagaTriggers } from "Lib/modules";
import { getExampleData } from "./services";
import { createActionTypes } from "./reducer";

const fetchExampleData = MODULE_KEY =>
  function*({ type, payload }) {
    const actionTypes = createActionTypes(MODULE_KEY);

    try {
      const exampleData = yield call(getExampleData);

      yield put({
        type: actionTypes.SET_EXAMPLE_DATA,
        payload: exampleData
      });
    } catch (e) {
      yield put({
        type: actionTypes.SET_EXAMPLE_DATA,
        payload: null
      });
    }
  };

const getSagaAttachments = MODULE_KEY => ({
  fetchExampleData: {
    take: takeEvery,
    trigger: `${MODULE_KEY}/ExampleModule/TRIGGER_fetchExampleData`,
    saga: fetchExampleData(MODULE_KEY)
  }
});

const initModuleSagas = MODULE_KEY => {
  const sagaAttachments = getSagaAttachments(MODULE_KEY);

  return {
    rootSaga: createRootSaga(sagaAttachments),
    triggers: getSagaTriggers(sagaAttachments)
  };
};

export default initModuleSagas;
```
```
// services.js

import { mockService } from "Lib/utils";

export const getExampleData = async () => {
  const data = await mockService({
    randomData: Math.random()
  });

  return data;
};
```
```
// selectors.js

import { createModuleSelector } from "Lib/modules";

export const getExampleData = MODULE_KEY => rootState => {
  const exampleDataSelector = createModuleSelector(
    MODULE_KEY,
    state => state.exampleData
  );
  const exampleData = exampleDataSelector(rootState);

  return exampleData;
};
```
```
// components/ROOT.js

import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExampleData } from "../selectors";
import { ModuleContext } from "../module";

const ExampleModule = () => {
  const exampleData = useSelector(
    getExampleData(useContext(ModuleContext).MODULE_KEY)
  );

  return (
    <div>
      <h6>Example Module</h6>
      {exampleData ? (
        <pre>{JSON.stringify(exampleData, null, 2)}</pre>
      ) : exampleData === null ? (
        "error loading data"
      ) : (
        <progress />
      )}
    </div>
  );
};

export default ExampleModule;
```
