import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export function createHttpService(
  config: AxiosRequestConfig,
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  responseInterceptor?: (response: AxiosResponse) => any,
): AxiosInstance {
  const instance: AxiosInstance = axios.create(config);
  if (requestInterceptor) {
    instance.interceptors.request.use(requestInterceptor);
  }
  if (responseInterceptor) {
    instance.interceptors.response.use(responseInterceptor);
  }
  return instance;
}
