import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios, { Method } from "axios";
import { ApiContext } from "../../context";

export function useApiRequest<Response = any, BodyOrParams = any>(
  method: Method,
  url: string
) {
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const contextInstance = useContext(ApiContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const perform = useCallback((data?: BodyOrParams) => {
    setLoading(true);
    return instance
      .request<Response>({
        signal: controllerRef.current.signal,
        method,
        url,
        data: method !== "get" ? data : undefined,
        params: method === "get" ? data : undefined,
      })
      .then(({ data }) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const clear = useCallback(() => {
    setData(null);
    setLoading(false);
    setError("");
  }, [setData, setLoading, setError]);

  return { data, error, loading, perform, cancel, clear };
}
