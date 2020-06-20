import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Axios } from 'axios-observable';
export declare class Repository {
    static requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    static responseInterceptor: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    static errorInterceptor: (error: AxiosError) => any | Promise<any>;
    protected http: AxiosInstance;
    protected httpObservable: Axios;
    constructor(httpConfig: AxiosRequestConfig, baseURL?: string);
    set baseURL(baseURL: string);
}
