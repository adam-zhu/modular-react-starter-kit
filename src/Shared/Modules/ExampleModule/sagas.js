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
