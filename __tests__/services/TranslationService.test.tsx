import {translationService} from '@react3l/react3l/services';
import React from 'react';
import {renderHook} from '@testing-library/react-hooks';

function useTranslation(): string {
  const [translated, setTranslated] = React.useState<string>('');

  React.useEffect(() => {
    translationService
      .init({
        resources: {},
        keySeparator: '.',
        fallbackLng: 'en',
        lng: 'en',
        ns: '',
        nsSeparator: ':',
        contextSeparator: '_',
        cleanCode: true,
        defaultNS: '',
        supportedLngs: ['en'],
        interpolation: {
          prefix: '{{',
          suffix: '}}',
        },
        returnEmptyString: true,
        returnNull: false,
        returnObjects: false,
      })
      .then(() => {
        translationService.addResource(
          'en',
          '',
          'hello.world',
          'Hello, world!',
        );
        setTranslated(translationService.translate('hello.world'));
      });
  }, []);

  return translated;
}

test('service:TranslationService', async () => {
  const {result, waitForNextUpdate} = renderHook(() => useTranslation());
  await waitForNextUpdate();
  expect(result.current).toEqual('Hello, world!');
});
