import i18next, {InitOptions, TFunction} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {translationRepository} from 'repositories/translation-repository';

export interface TranslationResource {
  [key: string]: string;
}

export class TranslationService {
  public static defaultLanguage: string = 'vi';

  public readonly initialOptions: InitOptions = {
    resources: {
      translations: {},
    },
    ns: '',
    lng: TranslationService.defaultLanguage,
    fallbackLng: TranslationService.defaultLanguage,
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

  public readonly initTranslation = async () => {
    await i18next
      .use(initReactI18next)
      .init(this.initialOptions)
      .then((translate: TFunction) => {
        this.translate = translate;
      });
  };

  public readonly changeLanguage = async (language: string) => {
    await i18next.changeLanguage(language);
  };

  public readonly setLanguage = async (language: string, resource: TranslationResource) => {
    await i18next.addResource(language, '', '', resource as any);
  };

  public readonly addLanguage = async (language: string) => {
    const resource: TranslationResource = await translationRepository.get(language);
    await this.setLanguage(language, resource);
  };
}

export const translationService: TranslationService = new TranslationService();
