import axios, {AxiosInstance} from 'axios';
import {httpConfig} from 'config/http';

export class Repository {
  protected http: AxiosInstance;

  constructor(http?: AxiosInstance) {
    this.http = (http !== undefined && http !== null) ? http : axios.create(httpConfig);
  }

  public setBaseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
  }
}
