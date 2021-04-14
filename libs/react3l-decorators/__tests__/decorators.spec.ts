import { Field } from 'react3l-decorators';

describe('Decorators', function() {
  it('Field', () => {
    class TestModel {
      @Field(Number)
      public id?: number;

      @Field(String)
      public code?: string;
    }

    const testModel = new TestModel();
    Object.assign(testModel, {
      id: '123',
      code: 123
    });
    expect(testModel.id).toEqual(123);
    expect(testModel.code).toEqual('123');
  });
});
