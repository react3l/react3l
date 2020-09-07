import i18next, { InitOptions, TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';

export interface TranslationResource {
  [key: string]: string;
}

export enum Language {
  vi = 'vi',

  en = 'en',
}

export class TranslationService {
  public translate: TFunction = (key: string): string => key;

  public initialOptions: InitOptions = {
    resources: {
      translations: {},
    },
    ns: '',
    lng: Language.vi,
    fallbackLng: Language.vi,
    defaultNS: '',
    nsSeparator: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      nestingSuffixEscaped: '.',
      prefix: '{{',
      suffix: '}}',
    },
  };

  constructor(defaultLanguage: string = Language.vi) {
    if (defaultLanguage) {
      this.initialOptions.lng = defaultLanguage;
      this.initialOptions.fallbackLng = defaultLanguage;
    }
  }

  public initTranslation = async (options?: InitOptions) => {
    await i18next
      .use(initReactI18next)
      .init({
        ...this.initialOptions,
        ...(options ?? {}),
      })
      .then((translate: TFunction) => {
        this.translate = translate;
      });
  };

  public changeLanguage = async (language: string, resource?: TranslationResource) => {
    if (resource) {
      await this.addResource(language, resource);
    }
    await i18next.changeLanguage(language);
  };

  public setLanguage = async (language: string, resource: TranslationResource) => {
    await i18next.addResources(language, '', resource);
  };

  public addResource = async (language: string, resource: TranslationResource) => {
    await i18next.addResources(language, '', resource);
  }
}

export const translationService: TranslationService = new TranslationService();
