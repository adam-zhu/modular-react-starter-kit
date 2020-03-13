import { mockService } from "Lib/utils";

export const getExampleData = async () => {
  const data = await mockService({
    randomData: Math.random()
  });

  return data;
};
