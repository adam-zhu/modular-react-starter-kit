const initialState = {
  data: undefined
};

export const SET_DATA = "About/set_data";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};
