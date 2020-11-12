import {Model} from '@react3l/react3l/core';

test('class:Model', () => {
  class TestModel extends Model {
    @Model.Field(String)
    public id?: string;

    @Model.Field(String)
    public code?: string;

    @Model.Field(String)
    public name?: string;
  }

  expect(new TestModel() instanceof Model).toEqual(true);
});
