import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Axios} from 'axios-observable';

export interface RepositoryInterceptors {
  http: number[];

  httpObservable: number[];
}

/**
 * This class aims to include all data access method for only one business domain
 */
export class Repository {
  protected static instances: Repository[] = [];

  public static addRepository(repository: Repository) {
    this.instances.push(repository);
  }

  public static getInstances(): Repository[] {
    return this.instances;
  }

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

  protected currentRequestInterceptors: RepositoryInterceptors = {
    http: [],
    httpObservable: [],
  };

  protected currentResponseInterceptors: RepositoryInterceptors = {
    http: [],
    httpObservable: [],
  };

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
    Repository.addRepository(this);

    /**
     * Add request interceptor into both instances
     */
    if (typeof Repository.requestInterceptor === 'function') {
      this.currentRequestInterceptors = {
        http: [
          this.http.interceptors.request.use(Repository.requestInterceptor),
        ],
        httpObservable: [
          this.httpObservable.interceptors.request.use(Repository.requestInterceptor),
        ],
      };
    }

    /**
     * Add response and error interceptors into both instances
     */
    if (typeof Repository.responseInterceptor === 'function') {
      this.currentResponseInterceptors = {
        http: [
          this.http.interceptors.response.use(Repository.responseInterceptor, Repository.errorInterceptor),
        ],
        httpObservable: [
          this.httpObservable.interceptors.response.use(Repository.responseInterceptor, Repository.errorInterceptor),
        ],
      };
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

  public ejectInterceptor = (type: 'request' | 'response' | 'both') => {
    switch (type) {
      case 'request':
        this.currentRequestInterceptors.http.forEach((id) => {
          this.http.interceptors.request.eject(id);
        });
        this.currentRequestInterceptors.httpObservable.forEach((id) => {
          this.httpObservable.interceptors.request.eject(id);
        });
        break;

      case 'response':
        this.currentResponseInterceptors.http.forEach((id) => {
          this.http.interceptors.response.eject(id);
        });
        this.currentResponseInterceptors.httpObservable.forEach((id) => {
          this.httpObservable.interceptors.response.eject(id);
        });
        break;

      case 'both':
        this.ejectInterceptor('request');
        this.ejectInterceptor('response');
        break;

      default:
        throw new Error('Param accept only request | response | both');
    }
  };
}
