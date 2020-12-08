import {Model} from '@react3l/react3l/core';
import {PrimitiveValue} from '@react3l/react3l/decorators/PrimitiveValue';
import {ClassValue} from '@react3l/react3l/decorators/ClassValue';
import {ClassList, EnumValue} from '@react3l/react3l/decorators';
import {OrderType} from '@react3l/react3l/types';

test('class:Model', () => {
  class TestModel extends Model {
    @PrimitiveValue(Number)
    public id?: number;

    @PrimitiveValue(String)
    public code?: string;

    @PrimitiveValue(String)
    public name?: string;

    @ClassValue()
    public parent?: TestModel;

    @ClassList()
    public children?: TestModel[];

    @EnumValue(OrderType)
    public orderType?: OrderType;
  }

  expect(new TestModel() instanceof Model).toEqual(true);

  const test: TestModel = TestModel.create();
  const testData: Partial<Record<keyof TestModel, any>> = {
    id: '123',
    name: 123,
    code: 123,
  };

  Object.assign(test, testData);
  test.parent = testData;
  test.children = [testData];
  Object.assign(test, {
    orderType: 'ASC',
  });

  expect(test.id).toEqual(123);
  expect(test.code).toEqual('123');
  expect(test.name).toEqual('123');
  expect(test.parent).toBeInstanceOf(TestModel);
  expect(test.children[0]).toBeInstanceOf(TestModel);
  expect(test.orderType).toEqual(OrderType.ASC);
});
