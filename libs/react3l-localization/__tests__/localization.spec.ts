import localization from 'react3l-localization';

describe('Localization', function() {
  test('translate successfully!', () => {
    const lng = 'vi';
    const resource: Record<string, string> = {
      'hello.world': 'Hello world'
    };
    return localization.initialize({
      lng,
      ns: '',
      defaultNS: '',
      fallbackLng: lng
    })
      .then(() => {
        localization.addLanguage(lng, resource);
        expect(localization.translate('hello.world')).toEqual(resource['hello.world']);
      });
  });
});
