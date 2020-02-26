import axios, {AxiosResponse} from 'axios';
import {GlobalState, LanguageType} from 'core/config';
import i18next from 'i18next';
import {join} from 'path';
import {setGlobal} from 'reactn';

/**
 * Translate marker
 *
 * @param {string} input
 * @returns {string}
 */
export function translate(input: string) {
  return input;
}

export async function changeLanguage(language: LanguageType) {
  await setGlobal<GlobalState>({
    loading: true,
  });
  await axios.get(join('/i18n', `${language}.json`))
             .then(async (response: AxiosResponse<any>) => {
               await i18next.addResource(language, '', '', response.data);
               await i18next.changeLanguage(language);
               await setGlobal<GlobalState>({
                 language,
               });
             });
}
