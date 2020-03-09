import { mockService } from "Lib/utils";

export const getExampleData = () =>
  mockService({
    randomData: Math.random()
  });
