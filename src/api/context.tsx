import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import React, { createContext, useEffect, useRef } from "react";

type ApiInstanceProviderProps = {
  config: AxiosRequestConfig;
  requestInterceptors?: [];
  responseInterceptors?: [];
  children: React.ReactNode;
};

export const ApiContext = createContext<AxiosInstance | null>(null);

export const ApiInstanceProvider = ({
  config = {},
  requestInterceptors = [],
  responseInterceptors = [],
  children,
}: ApiInstanceProviderProps) => {
  const instanceRef = useRef(axios.create(config));

  useEffect(() => {
    requestInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(interceptor);
    });

    responseInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(interceptor);
    });
  }, []);

  return (
    <ApiContext.Provider value={instanceRef.current}>
      {children}
    </ApiContext.Provider>
  );
};
