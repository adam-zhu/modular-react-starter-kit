import { call, put, takeEvery, all, spawn } from "redux-saga/effects";
import { mockService } from "../../shared/utils";
import { SET_DATA } from "./reducer";

export const TRIGGER_fetchData = "Home/TRIGGER_fetchData";
function* fetchData(action) {
  try {
    const data = yield call(mockService, {
      home: "page",
      example: "data"
    });

    yield put({ type: SET_DATA, payload: data });
  } catch (e) {
    yield put({ type: SET_DATA, payload: null });
  }
}

export default function* HomeRootSaga() {
  const attachSagaListener = (takeFn, trigger, saga) =>
    spawn(function*() {
      yield takeFn(trigger, saga);
    });

  yield all([attachSagaListener(takeEvery, TRIGGER_fetchData, fetchData)]);
}
