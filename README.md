This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React/Redux Modules

Build UI using "modules". Modules are just React components that do special stuff when they are mounted or unmounted by the React engine. The things that modules do are:

- mount/unmount a reducer onto the global redux store
- install/uninstall any redux middlewares
- dispatch redux actions
- render

The utilities for creating a module are:
```
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DynamicModuleLoader } from "redux-dynamic-modules-react";

export const DynamicModule = ({
  MODULE_KEY,
  ModuleRootComponent,
  ModuleRootReducer,
  ModuleRootSaga,
  onLoadActions, // on module reducer load
  onUnloadActions,
  onMountActions, // on module root React component mount
  onDismountActions,
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
    <DynamicModuleLoader strictMode={true} modules={[moduleConfig]}>
      <MountHookWrapper
        onMountActions={onMountActions}
        onDismountActions={onDismountActions}
      >
        <ModuleRootComponent {...props}>{children}</ModuleRootComponent>
      </MountHookWrapper>
    </DynamicModuleLoader>
  );
};

const MountHookWrapper = ({
  onMountActions,
  onDismountActions,
  children
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(onMountActions)) {
      onMountActions.forEach(dispatch);
    }

    if (Array.isArray(onDismountActions)) {
      return () => onDismountActions.forEach(dispatch);
    }
  }, [onMountActions, onDismountActions, dispatch]);

  return <>{children}</>;
};

```

[`<DynamicModuleLoader />` comes from `redux-dynamic-modules`](https://github.com/microsoft/redux-dynamic-modules).

Advantages of this method are that UI can be built by assembling entirely isolated components without sacrificing global control. Modules can be generally 1:1 with product features, and all code for a given product feature can be colocated within the module. Modules are React components, and when they are mounted or unmounted by the React DOM they set up and manage all of their dependencies in the background.

Because the React DOM is the top-level controller of what modules are loaded and what are not, if a module is mounted to the React DOM then its state can be accessed and interacted with through redux. Module actions and sagas are easily accessible to application context. Modules do not need to know about any parent context, and parent render contexts are fully empowered to control their child modules. With the use of a dynamic loading technique such as `React.lazy` or `react-loadable`, modules can be easily codesplit and dynamically loaded at runtime.

If a codebase is built this way, then the only code that is running in the project is what is mounted to the React DOM. The only state that exists to manage is what drives what is rendered to the screen. Once a component unmounts from the React DOM, its redux state will also disappear.

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
import ModuleRootComponent from "./components/ROOT";
import ModuleRootReducer from "./reducer";
import ModuleRootSaga from "./sagas";

const MODULE_KEY = "ExampleModule";

export default ({
  onLoadActions,
  onUnloadActions,
  onMountActions,
  onDismountActions,
  children,
  ...props
}) => {
  return (
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
};
```
```
// reducer.js

const initialState = {
  exampleData: undefined
};

export const ACTION_TYPES = {
  SET: `ExampleModule/SET`
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};
```
```
// sagas.js

import { all, call, put, spawn, takeLatest } from "redux-saga/effects";
import { getExampleData } from "./services";
import { ACTION_TYPES } from "./reducer";

const fetchExampleDataSaga = function*(triggerAction) {
  if (triggerAction.showLoading === true) {
    yield put({
      type: ACTION_TYPES.SET,
      payload: { exampleData: undefined }
    });
  }

  try {
    const exampleData = yield call(getExampleData);

    yield put({
      type: ACTION_TYPES.SET,
      payload: { exampleData }
    });
  } catch (e) {
    yield put({
      type: ACTION_TYPES.SET,
      payload: { exampleData: null }
    });
  }
};

export const SAGAS = {
  fetchExampleData: {
    take: takeLatest,
    trigger: "ExampleModule/fetchExampleData",
    saga: fetchExampleDataSaga
  }
};

export default function* ModuleRootSaga() {
  yield all(
    Object.values(SAGAS).map(({ take, trigger, saga }) =>
      spawn(function*() {
        yield take(trigger, saga);
      })
    )
  );
}
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
// components/ROOT.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SAGAS } from "../sagas";

const ExampleModule = props => {
  const exampleData = useSelector(
    rootState => rootState.ExampleModule.exampleData
  );
  const dispatch = useDispatch();
  const reloadDataHandler = e =>
    dispatch({
      type: SAGAS.fetchExampleData.trigger,
      showLoading: true
    });

  return (
    <div>
      <h6>Example Module</h6>
      {exampleData ? (
        <>
          <pre>{JSON.stringify(exampleData, null, 2)}</pre>
          <br />
          <button onClick={reloadDataHandler}>Reload Data</button>
        </>
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
