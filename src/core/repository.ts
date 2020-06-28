import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Axios} from 'axios-observable';

/**
 * This class aims to include all data access method for only one business domain
 */
export class Repository {
  /**
   * Interceptor to handle API Request
   */
  public static requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

  /**
   * Interceptor to handle API Response
   */
  public static responseInterceptor: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

  /**
   * Interceptor to handle API Call errors
   */
  public static errorInterceptor: (error: AxiosError) => any | Promise<any>;

  /**
   * HTTP Promise instance
   */
  protected http: AxiosInstance;

  /**
   * HTTP Observable instance
   */
  protected httpObservable: Axios;

  constructor(httpConfig: AxiosRequestConfig, baseURL?: string) {
    this.http = axios.create(httpConfig);
    this.httpObservable = Axios.create(httpConfig);

    /**
     * Add request interceptor into both instances
     */
    if (typeof Repository.requestInterceptor === 'function') {
      this.http.interceptors.request.use(Repository.requestInterceptor);
      this.httpObservable.interceptors.request.use(Repository.requestInterceptor);
    }

    /**
     * Add response and error interceptors into both instances
     */
    if (typeof Repository.responseInterceptor === 'function') {
      this.http.interceptors.response.use(Repository.responseInterceptor, Repository.errorInterceptor);
      this.httpObservable.interceptors.response.use(Repository.responseInterceptor, Repository.errorInterceptor);
    }

    /**
     * Set baseURL in constructor
     */
    if (typeof baseURL === 'string') {
      this.baseURL = baseURL;
    }
  }

  /**
   * Set baseURL for both http instances of this repository
   *
   * @param baseURL
   */
  public set baseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
    this.httpObservable.defaults.baseURL = baseURL;
  }
}
