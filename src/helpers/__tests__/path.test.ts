import {url} from 'helpers/path';

test('url works', () => {
  expect(url('http://localhost', 'api', 'sample')).toEqual('http://localhost/api/sample');
});
