import {Model, ModelFilter} from '@react3l/react3l/core';

test('class:ModelFilter', () => {
  class Test extends Model {
    public name?: string;
  }

  const data: ModelFilter<Test> = {
    skip: 50,
    take: 100,
    orderBy: 'name',
    orderType: 'ASC',
  };

  const filter: ModelFilter<Test> = new ModelFilter<Test>(data);

  expect(filter.skip).toEqual(data.skip);
  expect(filter.take).toEqual(data.take);
  expect(filter.orderBy).toEqual(data.orderBy);
  expect(filter.orderType).toEqual(data.orderType);
});
