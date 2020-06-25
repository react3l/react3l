import {Repository} from 'core/repository';
import {TranslationResource} from 'services/translation-service';
import {AxiosResponse} from 'axios';

export class TranslationRepository extends Repository {
  public static instances: TranslationRepository[] = [];

  public static set baseURL(baseURL: string) {
    this.instances.forEach((instance: TranslationRepository) => {
      instance.baseURL = baseURL;
    });
  }

  constructor() {
    super({});
    TranslationRepository.instances.push(this);
    this.baseURL = TranslationRepository.baseURL;
  }

  public get = (language: string): Promise<TranslationResource> => {
    return this.http.get<TranslationResource>(`${language}.json`)
      .then((response: AxiosResponse<TranslationResource>) => response.data);
  }
}

export const translationRepository: TranslationRepository = new TranslationRepository();
