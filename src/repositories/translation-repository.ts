import {Repository} from 'core/repository';
import {TranslationResource} from 'services/translation-service';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

export class TranslationRepository extends Repository {
  public static instances: TranslationRepository[] = [];

  public static set baseURL(baseURL: string) {
    this.instances.forEach((instance: TranslationRepository) => {
      instance.baseURL = baseURL;
    });
  }

  public static get baseURL(): string {
    if (this.instances.length > 0) {
      return this.instances[0].http.defaults.baseURL;
    }
    return null;
  }

  public responseInterceptor = (response: AxiosResponse): any => response;

  constructor(httpConfig: AxiosRequestConfig = {}) {
    super(httpConfig);
    TranslationRepository.instances.push(this);
    this.ejectInterceptor('both');
  }

  public get = (language: string): Promise<TranslationResource> => {
    return this.http.get<TranslationResource>(`${language}.json`)
      .then((response: AxiosResponse<TranslationResource>) => response.data);
  }
}

export const translationRepository: TranslationRepository = new TranslationRepository();
