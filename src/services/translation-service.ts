import {Service} from '@react3l/react3l/core';
import i18next, {i18n, InitOptions, TFunction} from 'i18next';
import {initReactI18next} from 'react-i18next';

export class TranslationService extends Service {
  /**
   * i18next instance
   *
   * @protected
   */
  protected i18nInstance: i18n;

  /**
   * Initial options for translation
   *
   * @protected
   * @type {InitOptions}
   */
  protected readonly initialOptions: InitOptions = {
    resources: {},
    nsSeparator: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      nestingSuffixEscaped: '.',
      prefix: '{{',
      suffix: '}}',
    },
  };

  constructor(i18nInstance?: i18n, options?: InitOptions) {
    super();
    if (i18nInstance) {
      this.i18nInstance = i18nInstance;
    }
    if (options) {
      Object.assign(this.initialOptions, options);
    }
  }

  /**
   * Get current i18next instance
   *
   * @return {i18n}
   */
  public getInstance(): i18n {
    return this.i18nInstance;
  }

  /**
   * Default translation namespace
   *
   * @type {string}
   */
  public get defaultNamespace(): string {
    return this.i18nInstance.options.defaultNS;
  }

  /**
   * Set default namespace
   *
   * @param ns {string}
   */
  public set defaultNamespace(ns: string) {
    this.i18nInstance.setDefaultNamespace(ns);
  }

  /**
   * Initialize translation service
   * @param options {InitOptions}
   */
  public init = async (options?: InitOptions) => {
    this.translate = await this.i18nInstance.use(initReactI18next).init({
      ...(this.initialOptions ?? {}),
      ...(options ?? {}),
    });
    return this.translate;
  };

  public translate?: TFunction = (key: string) => key;

  public get language(): string {
    return this.i18nInstance.language;
  }
}

export const translationService: TranslationService = new TranslationService(
  i18next,
);
