import {withTableFilterSuffix} from '../string';

describe('string helpers', () => {
  it('string works', () => {
    expect(withTableFilterSuffix('id')).toEqual('id-filter');
  });
});
