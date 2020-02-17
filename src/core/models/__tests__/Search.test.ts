import {Search} from '../Search';

class TestSearch extends Search {
  public name: string;
}

describe('Search', () => {
  it('create search from object', () => {
    const name: string = 'Test Search';
    const search: TestSearch = TestSearch.clone<TestSearch>({
      name,
    });
    expect(search.name).toEqual(name);
  });
});
