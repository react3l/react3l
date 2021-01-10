import type {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export declare namespace Interceptors {
  export type RequestInterceptor = (
    config: AxiosRequestConfig,
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

  export type ResponseInterceptor = (
    response: AxiosResponse,
  ) => AxiosResponse | Promise<AxiosResponse>;

  export type ErrorInterceptor = (
    error: AxiosError,
  ) => AxiosError | Promise<AxiosError>;
}
