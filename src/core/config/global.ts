export interface GlobalState {
  loading: boolean;

  language: string;

  fallbackLanguage: string;
}

export const initialGlobalState: GlobalState = {
  loading: false,
  language: 'vi',
  fallbackLanguage: 'vi',
};
