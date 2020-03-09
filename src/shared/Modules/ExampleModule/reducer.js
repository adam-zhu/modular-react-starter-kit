const initialState = {
  exampleData: undefined
};

export const createModuleActionTypes = MODULE_KEY => ({
  SET_EXAMPLE_DATA: `${MODULE_KEY}/ExampleModule/set_example_data`
});

const createModuleRootReducer = MODULE_KEY => (
  state = initialState,
  action
) => {
  const actionTypes = createModuleActionTypes(MODULE_KEY);

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

export default createModuleRootReducer;
