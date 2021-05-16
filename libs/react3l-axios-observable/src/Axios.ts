import type {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource
} from 'axios';
import axios from 'axios';
import type { Subscriber } from 'rxjs';
import { Observable } from 'rxjs';
import type { AxiosObservable } from './AxiosObservable';

type Any = any;

export namespace Axios {
  export type RequestInterceptor = (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

  export type ResponseInterceptor<T = Any> = (
    response: AxiosResponse<T>
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>;

  export type ErrorInterceptor<T = Any> = (
    error: AxiosError<T>
  ) => void | Promise<void>;
}

/**
 * @package [react3l-axios-observable](https://www.npmjs.com/package/react3l-axios-observable)
 * @namespace Axios
 * @author thanhtunguet <thanhtung.uet@gmail.com>
 * @description Axios class, like axios, but with observable methods
 */
export class Axios implements Pick<AxiosInstance, 'defaults' | 'interceptors'> {
  /**
   * Axios default config
   *
   * @type {AxiosRequestConfig}
   */
  public static defaults: AxiosRequestConfig = axios.defaults;

  /**
   * Axios interceptor manager
   *
   * @type {AxiosInstance['interceptor']}
   */
  public static interceptors: AxiosInstance['interceptors'] =
    axios.interceptors;

  /**
   * Class constructor
   *
   * @param axiosInstance - Axios instance
   */
  constructor(private axiosInstance: AxiosInstance) {
  }

  public get interceptors(): AxiosInstance['interceptors'] {
    return this.axiosInstance.interceptors;
  }

  public get defaults(): AxiosInstance['defaults'] {
    return this.axiosInstance.defaults;
  }

  /**
   * Create a new Axios instance
   * @param config {AxiosRequestConfig}
   */
  public static create(config?: AxiosRequestConfig): Axios {
    const axiosInstance: AxiosInstance = axios.create(config);
    return new Axios(axiosInstance);
  }

  public static request<T = Any>(
    config: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.request, config);
  }

  public static get<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.get, url, config);
  }

  public static delete<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.delete, url, config);
  }

  public static head<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.head, url, config);
  }

  public static options<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.options, url, config);
  }

  public static post<T = Any>(
    url: string,
    data?: Any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.post, url, data, config);
  }

  public static put<T = Any>(
    url: string,
    data?: Any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.put, url, data, config);
  }

  public static patch<T = Any>(
    url: string,
    data?: Any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(axios.patch, url, data, config);
  }

  /**
   * Create an observable function from a promise function
   *
   * @param promiseFunction
   * @param args
   * @private
   */
  private static createObservable<T>(
    promiseFunction: (...args: Any[]) => AxiosPromise<T>,
    ...args: Any[]
  ): AxiosObservable<T> {
    let config: AxiosRequestConfig = args[args.length - 1];
    config = typeof config === 'object' ? { ...config } : {};
    args[args.length - 1] = config;

    let cancelSource: CancelTokenSource;
    const hasCancelToken = !!config.cancelToken;
    if (hasCancelToken) {
      console.warn(
        `No need to use cancel token, just unsubscribe the subscription would cancel the http request automatically`
      );
    }

    return new Observable<AxiosResponse<T>>(
      (subscriber: Subscriber<AxiosResponse<T>>) => {
        if (!hasCancelToken) {
          cancelSource = axios.CancelToken.source();
          config.cancelToken = cancelSource.token;
        }

        promiseFunction(...args)
          .then((response) => {
            subscriber.next(response);
            subscriber.complete();
          })
          .catch((error: AxiosError) => subscriber.error(error));
      }
    );
  }

  public request<T = Any>(config: AxiosRequestConfig): AxiosObservable<T> {
    return Axios.createObservable<T>(this.axiosInstance.request, config);
  }

  public get<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(this.axiosInstance.get, url, config);
  }

  public delete<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(this.axiosInstance.delete, url, config);
  }

  public head<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(this.axiosInstance.head, url, config);
  }

  public options<T = Any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(this.axiosInstance.options, url, config);
  }

  public post<T = Any>(
    url: string,
    data?: Any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(
      this.axiosInstance.post,
      url,
      data,
      config
    );
  }

  public put<T = Any>(
    url: string,
    data?: Any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(this.axiosInstance.put, url, data, config);
  }

  public patch<T = Any>(
    url: string,
    data?: Any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return Axios.createObservable<T>(
      this.axiosInstance.patch,
      url,
      data,
      config
    );
  }
}
