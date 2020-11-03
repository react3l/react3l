import { Model } from '@react3l/react3l/core/model';
import { Moment } from 'moment';
import 'reflect-metadata';

test('model', () => {
  class TestClass extends Model {
    public id?: number;

    public code?: string;

    public name?: string;
  }
  class TestUser extends Model {
    public code?: string;

    public name?: string;

    public email?: string;

    public birthday?: Moment;

    public userClassId?: number;

    public userClass?: TestClass;
  }

  const testId: number = 1;
  const testName: string = 'Test Name';

  const testUser: TestUser = TestUser.clone<TestUser>({
    id: testId,
    name: testName,
  });

  expect(testUser.id).toEqual(testId);
  expect(testUser.name).toEqual(testName);
  expect(testUser instanceof TestUser).toEqual(true);
});
