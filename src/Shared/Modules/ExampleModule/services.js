import { mockService } from "Lib/utils";

export const getExampleData = async () => {
  const data = await mockService(Math.random(), 666);

  return data;
};
