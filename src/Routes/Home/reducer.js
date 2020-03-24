const initialState = {
  data: undefined
};

export const ACTION_TYPES = {
  SET: `Home/SET`
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
