import {Search} from './Search';

describe('Search', () => {
  it('create search from object', () => {
    const orderBy: string = 'name';
    const search: Search = new Search({
      orderBy,
      orderType: 'desc',
    });
    expect(search.orderBy).toEqual(orderBy);
  });
});
