import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Repository} from 'core/repositories';
import {BASE_URL} from './consts';

export const httpConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

Repository.defaultRequestInterceptor = defaultRequestInterceptor;

Repository.defaultResponseInterceptor = defaultResponseInterceptor;

export function defaultRequestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  return config;
}

export function defaultResponseInterceptor<T>(response: AxiosResponse<T>) {
  return response;
}
