import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import Axios from '@react3l/axios-observable';

export class Repository {
  /**
   * Global request interceptor
   *
   * Transform HTTP Request
   *
   * Apply for all instances
   *
   * @type {RequestInterceptor}
   */
  public static requestInterceptor?: RequestInterceptor;

  /**
   * Global response interceptor
   *
   * Transform HTTP Response
   *
   * Apply for all instances
   *
   * @type {ResponseInterceptor}
   */
  public static responseInterceptor?: ResponseInterceptor;

  /**
   * Global error interceptor
   *
   * Handle HTTP Error
   *
   * Apply for all instances
   *
   * @type {ErrorInterceptor}
   */
  public static errorInterceptor?: ErrorInterceptor;

  /**
   * Axios instance of this repository
   *
   * @protected
   * @type {Axios}
   */
  protected http: Axios;

  constructor(config?: AxiosRequestConfig) {
    this.http = Axios.create(config);

    if (typeof Repository.requestInterceptor === 'function') {
      this.http.interceptors.request.use(Repository.requestInterceptor);
    }

    if (typeof Repository.responseInterceptor === 'function') {
      this.http.interceptors.response.use(Repository.responseInterceptor);
    }

    if (typeof Repository.errorInterceptor === 'function') {
      this.http.interceptors.response.use(
        undefined,
        Repository.errorInterceptor,
      );
    }
  }

  /**
   * URL prefix for this repository
   *
   * @type {string}
   */
  public get baseURL(): string {
    return this.http?.defaults?.baseURL;
  }

  public set baseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
  }
}

export type RequestInterceptor = (
  config: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

export type ResponseInterceptor = (
  response: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse>;

export type ErrorInterceptor = (
  error: AxiosError,
) => AxiosError | Promise<AxiosError>;
