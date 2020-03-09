import { mockService } from "Lib/utils";

export const getAboutData = async () => {
  const data = await mockService({
    about: "page",
    example: "data"
  });

  return data;
};
