import { createSelector } from "reselect";

export const getFormattedUserData = rootState => {
  const { user, userDetails } = rootState.AppShell;

  if (user === undefined || userDetails === undefined) {
    return undefined;
  }

  if (user === null || userDetails === null) {
    return null;
  }

  const { name, email } = user;
  const { address, state, zip } = userDetails;

  return `Name: ${name}, Email: ${email} || ${address}, ${state} ${zip}`;
};
