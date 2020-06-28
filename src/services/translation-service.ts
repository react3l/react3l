import i18next, {i18n, InitOptions, TFunction} from 'i18next';
import {initReactI18next, useTranslation, UseTranslationOptions} from 'react-i18next';
import {TranslationRepository} from 'repositories/translation-repository';

export interface TranslationResource {
  [key: string]: string;
}

export class TranslationService {
  private static _defaultLanguage: string = 'vi';

  private static _fallbackLanguage: string = 'vi';

  constructor(translationRepository: TranslationRepository) {
    this.translationRepository = translationRepository;
  }

  public static set defaultLanguage(value: string) {
    this._defaultLanguage = value;
  }

  public static set fallbackLanguage(value: string) {
    this._fallbackLanguage = value;
  }

  public static setLanguage(language: string, fallbackLanguage?: string) {
    this.defaultLanguage = language;
    if (fallbackLanguage) {
      this.fallbackLanguage = fallbackLanguage;
    }
  }

  public i18n: i18n = i18next;

  public translationRepository: TranslationRepository;

  public initialOptions: InitOptions = {
    resources: {
      translations: {},
    },
    ns: '',
    lng: TranslationService._defaultLanguage,
    fallbackLng: TranslationService._fallbackLanguage,
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

  public translate: TFunction = (key: string) => {
    return key;
  };

  public initTranslation = async () => {
    await this.i18n
      .use(initReactI18next)
      .init(this.initialOptions)
      .then((translate: TFunction) => {
        this.translate = translate;
      });
  };

  public changeLanguage = async (language: string, resource?: TranslationResource) => {
    if (resource) {
      await this.setLanguage(language, resource);
    }
    await this.i18n.changeLanguage(language);
  };

  public setLanguage = async (language: string, resource: TranslationResource) => {
    await this.i18n.addResources(language, '', resource);
  };

  public addLanguage = async (language: string) => {
    const resource: TranslationResource = await this.translationRepository.get(language);
    await this.setLanguage(language, resource);
  };

  public useTranslation(options: UseTranslationOptions = {
    i18n: this.i18n,
    useSuspense: false,
  }) {
    return useTranslation('', options);
  }
}
