import { all, call, put, spawn, takeLatest } from "redux-saga/effects";
import { getUser, getUserDetails } from "./services";
import { ACTION_TYPES } from "./reducer";

const fetchUserSaga = function*(triggerAction) {
  try {
    const user = yield call(getUser);

    yield put({ type: ACTION_TYPES.SET, payload: { user } });
    yield put({
      type: SAGAS.fetchUserDetails.trigger,
      id: user.id
    });
  } catch (e) {
    yield put({ type: ACTION_TYPES.SET, payload: { user: null } });
  }
};

const fetchUserDetailsSaga = function*(triggerAction) {
  try {
    const userDetails = yield call(getUserDetails, { id: triggerAction.id });

    yield put({ type: ACTION_TYPES.SET, payload: { userDetails } });
  } catch (e) {
    yield put({ type: ACTION_TYPES.SET, payload: { userDetails: null } });
  }
};

export const SAGAS = {
  fetchUser: {
    take: takeLatest,
    trigger: `AppShell/fetchUser`,
    saga: fetchUserSaga
  },
  fetchUserDetails: {
    take: takeLatest,
    trigger: `AppShell/fetchUserDetails`,
    saga: fetchUserDetailsSaga
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
