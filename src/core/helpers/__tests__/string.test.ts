import {url} from 'core/helpers/string';

describe('string helpers', () => {
  it('url works', () => {
    expect(url('http://localhost', 'api/test')).toEqual('http://localhost/api/test');
  });
});
