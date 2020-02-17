import {AxiosRequestConfig} from 'axios';
import {BASE_URL} from './consts';

export const httpConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
