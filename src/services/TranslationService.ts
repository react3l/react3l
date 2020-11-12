import {Service} from '@react3l/react3l/core';
import i18next, {i18n, InitOptions, TFunction} from 'i18next';
import {initReactI18next} from 'react-i18next';

export class TranslationService extends Service {
  protected i18nInstance: i18n = i18next;

  protected readonly initialOptions: InitOptions = {};

  constructor(i18nInstance: i18n = i18next, options?: InitOptions) {
    super();
    this.i18nInstance = i18nInstance;
    this.initialOptions = options;
  }

  public get defaultNamespace(): string {
    return this.i18nInstance.options.defaultNS;
  }

  public set defaultNamespace(ns: string) {
    this.i18nInstance.setDefaultNamespace(ns);
  }

  public init = async (options?: InitOptions) => {
    this.translate = await this.i18nInstance.use(initReactI18next).init({
      ...(this.initialOptions ?? {}),
      ...(options ?? {}),
    });
    return this.translate;
  };

  public translate?: TFunction = (key: string) => key;

  public changeLanguage: i18n['changeLanguage'] = (language: string) => {
    return this.i18nInstance.changeLanguage(language);
  };

  public addResource: i18n['addResource'] = (
    lng: string,
    ns: string,
    key: string,
    value: string,
    options?: {keySeparator?: string; silent?: boolean},
  ) => {
    this.i18nInstance.addResource(lng, ns, key, value, options);
    return this.i18nInstance;
  };

  public addResources: i18n['addResources'] = (
    lng: string,
    ns: string,
    resources: any,
  ) => {
    this.i18nInstance.addResources(lng, ns, resources);
    return this.i18nInstance;
  };

  public get language(): string {
    return this.i18nInstance.language;
  }
}

export const translationService: TranslationService = new TranslationService();
