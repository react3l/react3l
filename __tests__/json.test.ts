import {jsonHelper} from '@react3l/react3l/helpers/json';

test('flatten works', () => {
  const json = {
    test: {
      key: 'value',
    },
  };
  const flattenJSON = jsonHelper.flatten(json);
  expect(flattenJSON.hasOwnProperty('test.key')).toEqual(true);
  expect(flattenJSON['test.key']).toEqual(json.test.key);
});

test('unflatten works', () => {
  const json = {
    'test.keyA': 'a',
    'test.keyB': 1,
  };
  const unflattenJSON = jsonHelper.unflatten(json);
  expect(unflattenJSON.test.keyA).toEqual(json['test.keyA']);
  expect(unflattenJSON.test.keyB).toEqual(json['test.keyB']);
});
