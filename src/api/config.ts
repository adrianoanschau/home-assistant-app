import { AxiosRequestConfig } from "axios";
import { getYear } from "date-fns";

export const ApiConfig: AxiosRequestConfig = {
  baseURL: `https://home-financial-assistant.herokuapp.com/api`,
  headers: {
    Accept: "application/vnd.api+json",
    Year: getYear(new Date()),
  },
};
