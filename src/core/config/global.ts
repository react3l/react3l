export type LanguageType = 'en' | 'vi';

export interface GlobalState {
  language?: LanguageType;

  fallbackLanguage?: LanguageType;

  loading?: boolean;
}

const initialGlobalState: GlobalState = {
  language: 'vi',
  fallbackLanguage: 'vi',
  loading: true,
};

export default initialGlobalState;
