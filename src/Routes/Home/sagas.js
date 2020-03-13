import { call, put, takeEvery } from "redux-saga/effects";
import { createRootSaga, getSagaTriggers } from "Lib/modules";
import { getHomeData } from "./services";
import { createActionTypes } from "./reducer";

const fetchData = MODULE_KEY =>
  function*({ type, payload }) {
    const actionTypes = createActionTypes(MODULE_KEY);

    try {
      const data = yield call(getHomeData);

      yield put({ type: actionTypes.SET_DATA, payload: data });
    } catch (e) {
      yield put({ type: actionTypes.SET_DATA, payload: null });
    }
  };

const getSagaAttachments = MODULE_KEY => ({
  fetchData: {
    take: takeEvery,
    trigger: `${MODULE_KEY}/ExampleModule/TRIGGER_fetchData`,
    saga: fetchData(MODULE_KEY)
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
