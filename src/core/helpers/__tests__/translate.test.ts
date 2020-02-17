import {translate} from '../translate';

describe('translate helpers', () => {
  it('translate', () => {
    expect(translate('key.subKey')).toEqual('key.subKey');
  });
});
