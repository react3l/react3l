import {Repository} from '@react3l/react3l/core/repository';
import {TranslationResource} from '@react3l/react3l/services/translation-service';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {map, retry} from 'rxjs/operators';

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

  constructor(httpConfig: AxiosRequestConfig = {}) {
    super(httpConfig);
    TranslationRepository.instances.push(this);
    this.ejectInterceptor('both');
  }

  /**
   * Translation resource base URL getter
   */
  public static get baseURL(): string {
    if (this.instances.length > 0) {
      return this.instances[0].httpObservable.defaults.baseURL;
    }
    return null;
  }

  /**
   * Translation resource base URL setter
   */
  public static set baseURL(baseURL: string) {
    this.instances.forEach((instance: TranslationRepository) => {
      instance.baseURL = baseURL;
    });
  }

  /**
   * HTTP Response Interceptor
   *
   * @param response {AxiosResponse}
   * @return {AxiosResponse | Promise<AxiosResponse>}
   */
  public responseInterceptor = (response: AxiosResponse): any => response;

  /**
   * Get language resource
   *
   * @param language {string}
   * @return {TranslationResource}
   */
  public get = (language: string): Promise<TranslationResource> => {
    return this.httpObservable.get<TranslationResource>(`${language}.json`)
      .pipe(
        retry(3),
        map((response: AxiosResponse<TranslationResource>) => response.data),
      )
      .toPromise();
  }
}

export const translationRepository: TranslationRepository = new TranslationRepository();
