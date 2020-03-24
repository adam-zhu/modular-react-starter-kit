const initialState = {
  user: undefined,
  userDetails: undefined
};

export const ACTION_TYPES = {
  SET: `AppShell/SET`
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
