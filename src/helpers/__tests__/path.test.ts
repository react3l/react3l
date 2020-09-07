import {url} from '@react3l/react3l/helpers/path';

test('url works', () => {
  expect(url('http://localhost', 'api', 'sample')).toEqual('http://localhost/api/sample');
});
