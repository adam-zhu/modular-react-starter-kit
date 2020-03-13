const initialState = {
  exampleData: undefined
};

export const createActionTypes = MODULE_KEY => ({
  SET_EXAMPLE_DATA: `${MODULE_KEY}/ExampleModule/set_example_data`
});

const createReducer = MODULE_KEY => (state = initialState, action) => {
  const actionTypes = createActionTypes(MODULE_KEY);

  switch (action.type) {
    case actionTypes.SET_EXAMPLE_DATA:
      return {
        ...state,
        exampleData: action.payload
      };

    default:
      return state;
  }
};

export default createReducer;
