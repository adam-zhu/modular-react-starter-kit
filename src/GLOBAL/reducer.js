const initialState = {
  user: undefined
};

export const SET_USER = "GLOBAL/set_user";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};
