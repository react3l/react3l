import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {transformAPIContent} from 'core/helpers/data';
import {Repository} from 'core/repositories/Repository';
import {transformAPIRequestValue, transformAPIResponseValue} from 'helpers/api';
import {BASE_URL} from 'core/config';

Repository.defaultRequestInterceptor = requestInterceptor;

Repository.defaultResponseInterceptor = responseInterceptor;

export function requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  if (typeof config.params === 'object' && config.params !== null) {
    config.params = transformAPIContent(config.params, undefined, transformAPIRequestValue);
  }
  if (typeof config.data === 'object' && config.data !== null) {
    config.data = transformAPIContent(config.data, undefined, transformAPIRequestValue);
  }
  return config;
}

export function responseInterceptor<T>(response: AxiosResponse<T>) {
  if (typeof response.data === 'object' && response.data !== null) {
    response.data = transformAPIContent(response.data as any, undefined, transformAPIResponseValue);
  }
  return response;
}

export const httpConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
