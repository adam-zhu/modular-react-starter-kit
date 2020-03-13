import { call, put, takeEvery } from "redux-saga/effects";
import { createRootSaga, getSagaTriggers } from "Lib/modules";
import { getUser, getUserDetails } from "./services";
import { createActionTypes } from "./reducer";

const fetchUser = MODULE_KEY =>
  function*({ type, payload }) {
    const actionTypes = createActionTypes(MODULE_KEY);
    const triggers = getSagaTriggers(getSagaAttachments(MODULE_KEY));

    try {
      const user = yield call(getUser);

      yield put({ type: actionTypes.SET_USER, payload: user });
      yield put({
        type: triggers.fetchUserDetails,
        payload: { id: user.id }
      });
    } catch (e) {
      yield put({ type: actionTypes.SET_USER, payload: null });
    }
  };

const fetchUserDetails = MODULE_KEY =>
  function*({ type, payload }) {
    const { id } = payload; // user id for
    const actionTypes = createActionTypes(MODULE_KEY);

    try {
      const userDetails = yield call(getUserDetails, { id });

      yield put({ type: actionTypes.SET_USER_DETAILS, payload: userDetails });
    } catch (e) {
      yield put({ type: actionTypes.SET_USER_DETAILS, payload: null });
    }
  };

const getSagaAttachments = MODULE_KEY => ({
  fetchUser: {
    take: takeEvery,
    trigger: `${MODULE_KEY}/AppShell/TRIGGER_fetchUser`,
    saga: fetchUser(MODULE_KEY)
  },
  fetchUserDetails: {
    take: takeEvery,
    trigger: `${MODULE_KEY}/AppShell/TRIGGER_fetchUserDetails`,
    saga: fetchUserDetails(MODULE_KEY)
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
