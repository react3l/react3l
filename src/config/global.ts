import {User} from 'models/User';

export type LanguageType = 'en' | 'vi';

export interface GlobalState {
  language?: LanguageType;

  fallbackLanguage?: LanguageType;

  loading?: boolean;

  user?: User;
}

const initialGlobalState: GlobalState = {
  language: 'vi',
  fallbackLanguage: 'vi',
  loading: true,
  user: null,
};

export default initialGlobalState;
