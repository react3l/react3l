import Axios from '@react3l/axios-observable';
import type {AxiosRequestConfig, AxiosResponse} from 'axios';
import type {Interceptors} from '@react3l/react3l/types';
import {map} from 'rxjs/operators';
import type {Model} from '@react3l/react3l/core';
import type {OperatorFunction} from 'rxjs';

/**
 * Combines all api requests that belong to a specific business domain or group
 * to one single class instance
 */
export class Repository {
  /**
   * Global request interceptor
   *
   * Transform HTTP Request
   *
   * Apply for all instances
   *
   * @type {Interceptors.RequestInterceptor}
   */
  public static requestInterceptor?: Interceptors.RequestInterceptor;

  /**
   * Global response interceptor
   *
   * Transform HTTP Response
   *
   * Apply for all instances
   *
   * @type {Interceptors.ResponseInterceptor}
   */
  public static responseInterceptor?: Interceptors.ResponseInterceptor;

  /**
   * Global error interceptor
   *
   * Handle HTTP Error
   *
   * Apply for all instances
   *
   * @type {Interceptors.ErrorInterceptor}
   */
  public static errorInterceptor?: Interceptors.ErrorInterceptor;

  /**
   * Axios instance of this repository
   *
   * @protected
   * @type {Axios}
   */
  protected http: Axios;

  /**
   * Repository constructor
   *
   * @param config {AxiosRequestConfig} - Axios config
   */
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

  /**
   * Set baseURL for this repository instance
   */
  public set baseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
  }

  /**
   * Map a http response to list of ModelClass
   *
   * @param ModelClass {typeof Model}
   */
  public static responseMapToList<T extends Model>(
    ModelClass: typeof Model,
  ): OperatorFunction<AxiosResponse<T[]>, T[]> {
    return map((response: AxiosResponse<T[]>) => {
      return response.data?.map((data: T) => {
        const instance: T = ModelClass.create();
        Object.assign(instance, data);
        return instance;
      });
    });
  }

  /**
   * Map a http response to a ModelClass
   *
   * @param ModelClass {typeof Model}
   */
  public static responseMapToModel<T extends Model>(
    ModelClass: typeof Model,
  ): OperatorFunction<AxiosResponse<T>, T> {
    return map((response: AxiosResponse<T>) => {
      const instance: T = ModelClass.create();
      Object.assign(instance, response.data);
      return instance;
    });
  }

  /**
   * Get response data as type T
   */
  public static responseDataMapper<T>(): OperatorFunction<AxiosResponse<T>, T> {
    return map((response: AxiosResponse<T>) => response.data);
  }
}
