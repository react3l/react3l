import type { InitOptions, TFunction } from 'i18next';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

export class Localization {
  public readonly useTranslation = useTranslation;

  private translateFunction?: TFunction;

  public readonly initialize = async (
    options: InitOptions = {}
  ): Promise<void> => {
    this.translateFunction = await i18next.use(initReactI18next).init(options);
  };

  public readonly translate = (
    key: string,
    params: Record<string, any>
  ): string => {
    if (typeof this.translateFunction === 'function') {
      return this.translateFunction(key, params);
    }
    return '';
  };

  public changeLanguage = async (lang: string): Promise<void> => {
    await i18next.changeLanguage(lang);
  };

  public addLanguage = async (
    lang: string,
    resources: Record<string, any>
  ): Promise<void> => {
    await i18next.addResources(lang, '', resources);
  };
}

const localization: Localization = new Localization();

export default localization;
