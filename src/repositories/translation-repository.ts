import { Repository } from 'core/repository';
import { TranslationResource } from 'services/translation-service';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Translation repository
 * Load translation resources via HTTP
 */
export class TranslationRepository extends Repository {
  /**
   * Repository instances
   *
   * @type instances {TranslationRepository[]}
   */
  public static instances: TranslationRepository[] = [];

  /**
   * Translation resource base URL setter
   */
  public static set baseURL(baseURL: string) {
    this.instances.forEach((instance: TranslationRepository) => {
      instance.baseURL = baseURL;
    });
  }

  /**
   * Translation resource base URL getter
   */
  public static get baseURL(): string {
    if (this.instances.length > 0) {
      return this.instances[0].http.defaults.baseURL;
    }
    return null;
  }

  /**
   * HTTP Response Interceptor
   *
   * @param response {AxiosResponse}
   * @return {AxiosResponse | Promise<AxiosResponse>}
   */
  public responseInterceptor = (response: AxiosResponse): any => response;

  constructor(httpConfig: AxiosRequestConfig = {}) {
    super(httpConfig);
    TranslationRepository.instances.push(this);
    this.ejectInterceptor('both');
  }

  /**
   * Get language resource
   *
   * @param language {string}
   * @return {TranslationResource}
   */
  public get = (language: string): Promise<TranslationResource> => {
    return this.http.get<TranslationResource>(`${language}.json`)
      .then((response: AxiosResponse<TranslationResource>) => response.data);
  }
}

export const translationRepository: TranslationRepository = new TranslationRepository();
