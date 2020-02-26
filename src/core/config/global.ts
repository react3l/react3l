import {APP_TITLE} from 'core/config/consts';

export type LanguageType = 'en' | 'vi';

export interface GlobalState {
  language?: LanguageType;
  
  fallbackLanguage?: LanguageType;
  
  loading?: boolean;
  
  title?: string;
}

const initialGlobalState: GlobalState = {
  language: 'vi',
  fallbackLanguage: 'vi',
  loading: true,
  title: APP_TITLE,
};

export default initialGlobalState;
