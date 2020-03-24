import { all, call, put, spawn, takeLatest } from "redux-saga/effects";
import { getAboutData } from "./services";
import { ACTION_TYPES } from "./reducer";

const fetchDataSaga = function*(triggerAction) {
  try {
    const data = yield call(getAboutData);

    yield put({ type: ACTION_TYPES.SET, payload: { data } });
  } catch (e) {
    yield put({ type: ACTION_TYPES.SET, payload: { data: null } });
  }
};

export const SAGAS = {
  fetchData: {
    take: takeLatest,
    trigger: "About/fetchData",
    saga: fetchDataSaga
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
