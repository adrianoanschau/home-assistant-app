import { useApiRequest } from "./use-api-request";

export function useApiPost<Response = any, Body = any>(url: string) {
  return useApiRequest<Response, Body>("post", url);
}
