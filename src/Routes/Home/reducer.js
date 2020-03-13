const initialState = {
  data: undefined
};

export const createActionTypes = MODULE_KEY => ({
  SET_DATA: `${MODULE_KEY}/Home/set_data`
});

const createReducer = MODULE_KEY => (state = initialState, action) => {
  const actionTypes = createActionTypes(MODULE_KEY);

  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};

export default createReducer;
