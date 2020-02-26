import {flatten, unflatten} from '../json';

describe('json helpers', () => {
  it('json works', () => {
    const nestedObject = {
      a: {
        b: 1,
      },
    };
    expect(flatten(nestedObject)['a.b']).toEqual(1);
    
    const flattenObject = {
      'a.b.c': 'string',
    };
    expect((unflatten(flattenObject) as any).a.b.c).toEqual('string');
  });
});
