import { useApiRequest } from "./use-api-request";

export function useApiPut<Response = any, Body = any>(url: string) {
  return useApiRequest<Response, Body>("put", url);
}
