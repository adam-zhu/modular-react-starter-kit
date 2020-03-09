const initialState = {
  data: undefined
};

export const createModuleActionTypes = MODULE_KEY => ({
  SET_DATA: `${MODULE_KEY}/Home/set_data`
});

const createModuleRootReducer = MODULE_KEY => (
  state = initialState,
  action
) => {
  const actionTypes = createModuleActionTypes(MODULE_KEY);

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

export default createModuleRootReducer;
