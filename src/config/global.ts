import {Model} from 'core/models';

export type LanguageType = 'en' | 'vi';

export interface GlobalState {
  language?: LanguageType;

  fallbackLanguage?: LanguageType;

  loading?: boolean;

  user?: Model;
}

const initialGlobalState: GlobalState = {
  language: 'vi',
  fallbackLanguage: 'en',
  loading: true,
  user: new Model(),
};

export default initialGlobalState;
