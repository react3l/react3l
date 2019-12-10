import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {httpConfig} from 'config/http';
import {createHttpService} from '../../helpers/http';

export class Repository {
  protected http: AxiosInstance;

  constructor(
    config: AxiosRequestConfig = httpConfig,
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    responseInterceptor?: (response: AxiosResponse) => any,
  ) {
    this.http = createHttpService(config, requestInterceptor, responseInterceptor);
  }

  public setBaseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
  }

  public getHttpInstance(): AxiosInstance {
    return this.http;
  }
}
