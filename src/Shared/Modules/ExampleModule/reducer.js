const initialState = {
  exampleData: undefined
};

export const ACTION_TYPES = {
  SET: `ExampleModule/SET`
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
