import initialGlobalState from 'core/config/global';
import {InitOptions} from 'i18next';

const i18nextConfig: InitOptions = {
  resources: {},
  lng: initialGlobalState.language,
  fallbackLng: initialGlobalState.fallbackLanguage,
  ns: '',
  defaultNS: '',
  nsSeparator: false,
  keySeparator: '.',
  interpolation: {
    escapeValue: false, nestingSuffixEscaped: '.', prefix: '{{', suffix: '}}',
  },
};

export default i18nextConfig;
