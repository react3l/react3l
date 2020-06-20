import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Axios} from 'axios-observable';

export class Repository {
  public static requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

  public static responseInterceptor: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

  public static errorInterceptor: (error: AxiosError) => any | Promise<any>;

  protected http: AxiosInstance;

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

  public set baseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
    this.httpObservable.defaults.baseURL = baseURL;
  }
}
