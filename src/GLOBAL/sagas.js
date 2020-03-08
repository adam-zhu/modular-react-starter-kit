import { call, put, takeEvery, all, spawn } from "redux-saga/effects";
import { mockService } from "../shared/utils";
import { SET_USER } from "./reducer";

export const TRIGGER_fetchUser = "GLOBAL/TRIGGER_fetchUser";
function* fetchUser(action) {
  try {
    const user = yield call(mockService, {
      name: "Not Pablo Escobar",
      email: "not_a_drug_smuggling_kingpin@hello_fbi.com"
    });

    yield put({ type: SET_USER, payload: user });
  } catch (e) {
    yield put({ type: SET_USER, payload: null });
  }
}

export const TRIGGER_fetchUser2 = "GLOBAL/TRIGGER_fetchUser2";
function* fetchUser2(action) {
  try {
    const user = yield call(mockService, {
      name: "Pablo Escobar",
      email: "actually_a_drug_smuggling_kingpin@hello_fbi.com"
    });

    yield put({ type: SET_USER, payload: user });
  } catch (e) {
    yield put({ type: SET_USER, payload: null });
  }
}

function* GlobalModuleRootSaga() {
  const attachSagaListener = (takeFn, trigger, saga) =>
    spawn(function*() {
      yield takeFn(trigger, saga);
    });

  yield all([
    attachSagaListener(takeEvery, TRIGGER_fetchUser, fetchUser),
    attachSagaListener(takeEvery, TRIGGER_fetchUser2, fetchUser2)
  ]);
}

export default GlobalModuleRootSaga;
