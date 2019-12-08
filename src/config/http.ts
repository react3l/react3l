import {AxiosRequestConfig} from 'axios';
import {BASE_URL} from './consts';

export const httpConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: BASE_URL,
};
