import { useApiRequest } from "./use-api-request";

export function useApiGet<T = any>(url: string) {
  return useApiRequest<T>("get", url);
}
