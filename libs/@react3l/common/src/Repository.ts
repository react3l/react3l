import { Axios } from '@react3l/axios-observable';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { OperatorFunction } from 'rxjs';
import type { Model } from '@react3l/common';
import { map } from 'rxjs/operators';

export class Repository {
  public static requestInterceptor: Axios.RequestInterceptor;

  public static responseInterceptor: Axios.ResponseInterceptor;

  public static errorInterceptor: Axios.ErrorInterceptor;

  protected static instances: Repository[] = [];

  protected http: Axios;

  constructor(config?: AxiosRequestConfig) {
    this.http = Axios.create(config);

    Repository.addInstance(this);

    const {
      requestInterceptor,
      responseInterceptor,
      errorInterceptor
    } = this.constructor.prototype;

    if (typeof requestInterceptor === 'function') {
      this.http.interceptors.request.use(requestInterceptor);
    }

    if (typeof responseInterceptor === 'function') {
      this.http.interceptors.response.use(responseInterceptor);
    }

    if (typeof errorInterceptor === 'function') {
      this.http.interceptors.response.use(undefined, errorInterceptor);
    }
  }

  public static get repositoryInstances(): Repository[] {
    return this.instances;
  }

  public get baseURL(): string | undefined {
    return this.http.defaults.baseURL;
  }

  public set baseURL(baseURL: string | undefined) {
    this.http.defaults.baseURL = baseURL;
  }

  /**
   * Map a http response to list of ModelClass
   *
   * @param ModelClass {typeof Model}
   */
  public static responseMapToList<T extends Model>(
    ModelClass: typeof Model
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
    ModelClass: typeof Model
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

  protected static addInstance(instance: Repository): void {
    this.instances.push(instance);
  }
}
