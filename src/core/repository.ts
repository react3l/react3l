import Axios from '@react3l/axios-observable';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RepositoryInterceptors {
  httpObservable: number[];
}

/**
 * This class aims to include all data access method for only one business domain
 */
export class Repository {
  /**
   * Interceptor to handle API Request
   *
   * @param config {AxiosRequestConfig}
   * @return {AxiosRequestConfig | Promise<AxiosRequestConfig>}
   */
  public static requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

  /**
   * Interceptor to handle API Response
   *
   * @param response {AxiosResponse}
   * @return {AxiosResponse | Promise<AxiosResponse>}
   */
  public static responseInterceptor: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

  /**
   * Interceptor to handle API Call errors
   *
   * @param error {AxiosError}
   * @throws {AxiosError}
   * @return {void | Promise<void>}
   */
  public static errorInterceptor: (error: AxiosError) => any | Promise<any>;

  /**
   * Store all repository instances
   *
   * @protected
   * @type {Repository[]}
   */
  protected static instances: Repository[] = [];

  /**
   * Store current request interceptors
   * @protected
   */
  protected currentRequestInterceptors: RepositoryInterceptors = {
    httpObservable: [],
  };

  /**
   * Store current response interceptors
   * @protected
   */
  protected currentResponseInterceptors: RepositoryInterceptors = {
    httpObservable: [],
  };

  /**
   * HTTP Observable instance
   *
   * @type {Axios}
   */
  protected httpObservable: Axios;

  /**
   * Construct a repository
   * @param httpConfig {AxiosRequestConfig}
   * @param baseURL {string}
   */
  constructor(httpConfig: AxiosRequestConfig, baseURL?: string) {
    this.httpObservable = Axios.create(httpConfig);

    Repository.addRepository(this);

    // Add request interceptor into both instances
    if (typeof Repository.requestInterceptor === 'function') {
      this.currentRequestInterceptors = {
        httpObservable: [
          this.httpObservable.interceptors.request.use(Repository.requestInterceptor),
        ],
      };
    }

    // Add response and error interceptors into both instances
    if (typeof Repository.responseInterceptor === 'function') {
      this.currentResponseInterceptors = {
        httpObservable: [
          this.httpObservable.interceptors.response.use(Repository.responseInterceptor, Repository.errorInterceptor),
        ],
      };
    }

    // Set baseURL in constructor
    if (typeof baseURL === 'string') {
      this.baseURL = baseURL;
    }
  }

  /**
   * Set baseURL for both http instances of this repository
   *
   * @param baseURL {string}
   */
  public set baseURL(baseURL: string) {
    this.httpObservable.defaults.baseURL = baseURL;
  }

  /**
   * Get baseURL
   *
   * @param baseURL {string}
   */
  public get baseURL(): string {
    return this.httpObservable.defaults.baseURL;
  }

  /**
   * Add a repository to static instance array
   *
   * @param repository {Repository}
   */
  public static addRepository(repository: Repository): void {
    this.instances.push(repository);
  }

  /**
   * Get all repository instances
   *
   * @return {Repository[]}
   */
  public static getInstances(): Repository[] {
    return this.instances;
  }

  /**
   * Eject an interceptor
   * @param type {'request' | 'response' | 'both'}
   */
  public ejectInterceptor = (type: 'request' | 'response' | 'both') => {
    switch (type) {
      case 'request':
        this.currentRequestInterceptors.httpObservable.forEach((id) => {
          this.httpObservable.interceptors.request.eject(id);
        });
        break;

      case 'response':
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
