import { call, put, takeEvery, all } from "redux-saga/effects";
import { createTriggerCreator, createSagaListener } from "Lib/modules";
import { getUser, getUserDetails } from "./services";
import { createModuleActionTypes } from "./reducer";

export const fetchUserTriggerCreator = createTriggerCreator("fetchUser");
const fetchUserCreator = MODULE_KEY =>
  function* fetchUser({ type, payload }) {
    const actionTypes = createModuleActionTypes(MODULE_KEY);

    try {
      const user = yield call(getUser);

      yield put({ type: actionTypes.SET_USER, payload: user });
      yield put({
        type: fetchUserDetailsTriggerCreator(MODULE_KEY),
        payload: { id: user.id }
      });
    } catch (e) {
      yield put({ type: actionTypes.SET_USER, payload: null });
    }
  };

export const fetchUserDetailsTriggerCreator = createTriggerCreator(
  "fetchUserDetails"
);
const fetchUserDetailsCreator = MODULE_KEY =>
  function* fetchUserDetails({ type, payload }) {
    const { id } = payload; // user id for
    const actionTypes = createModuleActionTypes(MODULE_KEY);

    try {
      const userDetails = yield call(getUserDetails, { id });

      yield put({ type: actionTypes.SET_USER_DETAILS, payload: userDetails });
    } catch (e) {
      yield put({ type: actionTypes.SET_USER_DETAILS, payload: null });
    }
  };

const createModuleRootSaga = MODULE_KEY =>
  function* AppShellRootSaga() {
    const fetchUser = fetchUserCreator(MODULE_KEY);
    const fetchUserTrigger = fetchUserTriggerCreator(MODULE_KEY);
    const fetchUserDetails = fetchUserDetailsCreator(MODULE_KEY);
    const fetchUserDetailsTrigger = fetchUserDetailsTriggerCreator(MODULE_KEY);

    yield all([
      createSagaListener(takeEvery, fetchUserTrigger, fetchUser),
      createSagaListener(takeEvery, fetchUserDetailsTrigger, fetchUserDetails)
    ]);
  };

export default createModuleRootSaga;
