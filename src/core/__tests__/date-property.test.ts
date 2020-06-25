import {Model} from 'core/model';
import {DateProperty} from 'core/date-property';

test('date-property', () => {
  class TestModel extends Model {
    @DateProperty()
    public createdAt?: Date | string;
  }

  const testTime: string = '2020-06-20';
  // const dateFormat: string = 'YYYY-MM-DD';
  const testModel: TestModel = new TestModel();
  testModel.createdAt = testTime;
  console.log(testModel);
  expect(testModel.createdAt).toEqual(testTime);
});
