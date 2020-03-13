const initialState = {
  user: undefined,
  userDetails: undefined
};

export const createActionTypes = MODULE_KEY => ({
  SET_USER: `${MODULE_KEY}/AppShell/set_user`,
  SET_USER_DETAILS: `${MODULE_KEY}/AppShell/set_user_details`
});

const createReducer = MODULE_KEY => (state = initialState, action) => {
  const actionTypes = createActionTypes(MODULE_KEY);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };

    default:
      return state;
  }
};

export default createReducer;
