import initialGlobalState, {GlobalState} from 'core/config/global';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import React from 'reactn';

export async function configTests() {
  await Promise.all([
    React.setGlobal<GlobalState>(initialGlobalState),
    i18n
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',
        debug: false,
        interpolation: {
          escapeValue: false, // not needed for react!!
        },
      }),
  ]);
}

export default i18n;
