import { AxiosRequestConfig } from "axios";
import { getYear } from "date-fns";

export const ApiConfig: AxiosRequestConfig = {
  baseURL: `http://192.168.1.17:3000/api`,
  headers: {
    Accept: "application/vnd.api+json",
    Year: getYear(new Date()),
  },
};
