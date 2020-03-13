import { createModuleSelector } from "Lib/modules";

export const getFormattedUserData = MODULE_KEY => rootState => {
  const userDataSelector = createModuleSelector(MODULE_KEY, state => {
    return {
      ...state.user,
      ...state.userDetails
    };
  });
  const { name, email, address, state, zip } = userDataSelector(rootState);

  return `Name: ${name}, Email: ${email} || ${address}, ${state} ${zip}`;
};
