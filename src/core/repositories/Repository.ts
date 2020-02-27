/* tslint:disable:variable-name */
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {createHttpService} from '../helpers/http';

export class Repository {

  private static _defaultRequestInterceptor: (v: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

  private static _defaultResponseInterceptor: (v: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>;

  protected http: AxiosInstance;

  constructor(
    config?: AxiosRequestConfig,
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    responseInterceptor?: <T>(response: AxiosResponse<T>) => AxiosResponse<T>,
  ) {
    this.http = createHttpService(config, requestInterceptor, responseInterceptor);
    if (typeof Repository._defaultRequestInterceptor === 'function') {
      this.http.interceptors.request.use(Repository._defaultRequestInterceptor);
    }
    if (typeof Repository._defaultResponseInterceptor === 'function') {
      this.http.interceptors.response.use(Repository._defaultResponseInterceptor);
    }
  }

  public setBaseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
  }

  public getHttpInstance(): AxiosInstance {
    return this.http;
  }

  static set defaultRequestInterceptor(value: (v: AxiosRequestConfig) => (AxiosRequestConfig | Promise<AxiosRequestConfig>)) {
    this._defaultRequestInterceptor = value;
  }

  static set defaultResponseInterceptor(value: (v: AxiosResponse<any>) => (AxiosResponse<any> | Promise<AxiosResponse<any>>)) {
    this._defaultResponseInterceptor = value;
  }
}
