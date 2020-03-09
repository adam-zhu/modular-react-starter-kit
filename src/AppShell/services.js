import { mockService } from "Lib/utils";

export const getUser = async () => {
  const user = await mockService({
    id: 1,
    name: "Not Pablo Escobar",
    email: "not_a_drug_smuggling_kingpin@hello_fbi.com"
  });

  return user;
};

export const getUserDetails = async ({ id }) => {
  console.log("fetching user details for user id", id);

  const userDetails = await mockService({
    address: "1234 Scarface Street",
    state: "CA",
    zip: "90210"
  });

  return userDetails;
};
