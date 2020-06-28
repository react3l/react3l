import 'reflect-metadata';
import {Model} from 'core/model';
import {RegisteredModel} from 'core/registered-model';

test('model', () => {
  @RegisteredModel()
  class TestModel extends Model {
    public id?: number;

    public name?: string;
  }

  const testId: number = 1;
  const testName: string = 'Test Name';

  const testModel: TestModel = TestModel.clone<TestModel>({
    id: testId,
    name: testName,
  });

  expect(testModel.id).toEqual(testId);
  expect(testModel.name).toEqual(testName);
  expect(testModel instanceof TestModel).toEqual(true);
});
