import { mockService } from "Lib/utils";

export const getHomeData = async () => {
  const data = await mockService({
    home: "page",
    example: "data"
  });

  return data;
};
