import { call, put, takeEvery, all } from "redux-saga/effects";
import { createTriggerCreator, createSagaListener } from "Lib/modules";
import { getAboutData } from "./services";
import { createModuleActionTypes } from "./reducer";

export const fetchDataTriggerCreator = createTriggerCreator("fetchData");
const fetchDataCreator = MODULE_KEY =>
  function* fetchData({ type, payload }) {
    const actionTypes = createModuleActionTypes(MODULE_KEY);

    try {
      const data = yield call(getAboutData);

      yield put({ type: actionTypes.SET_DATA, payload: data });
    } catch (e) {
      yield put({ type: actionTypes.SET_DATA, payload: null });
    }
  };

export default MODULE_KEY =>
  function* AboutRootSaga() {
    const fetchData = fetchDataCreator(MODULE_KEY);
    const fetchDataTrigger = fetchDataTriggerCreator(MODULE_KEY);

    yield all([createSagaListener(takeEvery, fetchDataTrigger, fetchData)]);
  };
