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
