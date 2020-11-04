import { Model, ModelFilter } from '@react3l/react3l/core';
import { Entity, Field, Relation } from '@react3l/react3l/decorators';
import {IdFilter, StringFilter } from '@react3l/advanced-filters';
import { DEFAULT_TAKE, INITIAL_SKIP } from '@react3l/react3l/config';

test('ModelFilter and decorators', () => {
  @Entity()
  class Test extends Model {
    @Field(Number)
    public id?: number;

    @Field(String)
    public code?: string;
  }

  @Entity()
  class TestFilter extends ModelFilter<Test> {
    @Relation(IdFilter)
    public id?: IdFilter;

    @Relation(StringFilter)
    public code?: StringFilter;
  }

  const testFilter: TestFilter = new TestFilter({
    id: {
      equal: 1,
    },
    code: {
      startWith: 'code',
    },
  });

  expect(testFilter.id.equal).toEqual(1);
  expect(testFilter.code.startWith).toEqual('code');
  expect(testFilter.id).toBeInstanceOf(IdFilter);
  expect(testFilter.code).toBeInstanceOf(StringFilter);
  expect(testFilter.take).toEqual(DEFAULT_TAKE);
  expect(testFilter.skip).toEqual(INITIAL_SKIP);
});
