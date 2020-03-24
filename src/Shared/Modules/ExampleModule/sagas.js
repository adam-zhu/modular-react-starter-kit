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
