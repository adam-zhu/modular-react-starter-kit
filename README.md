This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React/Redux Modules

Build UI using "modules". Modules are just React components that do special stuff when they are mounted or unmounted by the React engine. The things that modules do are:

- mount/unmount a reducer onto the global redux store
- install/uninstall any redux middlewares
- dispatch redux actions
- render

The factory function for creating a module is

```
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
```

[`<DynamicModuleLoader />` comes from `redux-dynamic-modules`](https://github.com/microsoft/redux-dynamic-modules).

Advantages of this method are that UI can be built by assembling entirely isolated components without sacrificing global control. Modules can be generally 1:1 with product features, and all code for a given product feature can be colocated within the module. Modules are React components, and when they are mounted or unmounted by the React DOM they set up and manage all of their dependencies in the background. When a module is declared as part of a React component's render content, it is passed a `MODULE_KEY` which is both the global Redux store key its reducer is keyed under and also the prefix for all its action types.

Because the React DOM is the top-level controller of what is loaded and what is not, if a module is mounted to the React DOM then we have access to its state through its `MODULE_KEY`. We can then use this to expose any exterior interactions against the module's state from elsewhere in the application. Modules do not need to know about any parent context and can ask for any data they need to be passed in at mount time. With the use of a dynamic loading technique such as `React.lazy` or `react-loadable`, modules can be easily codesplit and dynamically loaded at runtime.

Here is an example module declaration:

```
// module.js
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
```

```
// reducer.js
const initialState = {
  exampleData: undefined
};

export const createModuleActionTypes = MODULE_KEY => ({
  SET_EXAMPLE_DATA: `${MODULE_KEY}/ExampleModule/set_example_data`
});

const createModuleRootReducer = MODULE_KEY => (
  state = initialState,
  action
) => {
  const actionTypes = createModuleActionTypes(MODULE_KEY);

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

export default createModuleRootReducer;
```

```
// sagas.js
import { call, put, takeEvery, all } from "redux-saga/effects";
import { createTriggerCreator, createSagaListener } from "Lib/modules";
import { getExampleData } from "./services";
import { createModuleActionTypes } from "./reducer";

export const fetchExampleDataTriggerCreator = createTriggerCreator(
  "fetchExampleData"
);
const fetchExampleDataCreator = MODULE_KEY =>
  function* fetchExampleData({ type, payload }) {
    const actionTypes = createModuleActionTypes(MODULE_KEY);

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

const createModuleRootSaga = MODULE_KEY =>
  function* ExampleModuleRootSaga() {
    const fetchExampleData = fetchExampleDataTriggerCreator(MODULE_KEY);
    const fetchExampleDataTrigger = fetchExampleDataCreator(MODULE_KEY);

    yield all([
      createSagaListener(takeEvery, fetchExampleData, fetchExampleDataTrigger)
    ]);
  };

export default createModuleRootSaga;
```

```
// components/ROOT.js
import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExampleData } from "../selectors";
import ModuleContext from "../module";

const ExampleModule = ({ MODULE_KEY }) => {
  const exampleData = useSelector(
    useContext(ModuleContext) || getExampleData(MODULE_KEY)
  );

  return (
    <div>
      <h6>Example Module</h6>
      <pre>{JSON.stringify(exampleData, null, 2)}</pre>
    </div>
  );
};

export default ExampleModule;
```
