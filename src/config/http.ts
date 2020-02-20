import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Repository} from 'core/repositories';
import {BASE_URL} from './consts';

export const httpConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

Repository.defaultRequestInterceptor = requestInterceptor;

Repository.defaultResponseInterceptor = responseInterceptor;

export function requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  return config;
}

export function responseInterceptor<T>(response: AxiosResponse<T>) {
  return response;
}
