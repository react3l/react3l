import 'reflect-metadata';
import {TestUser} from '@react3l/react3l/__tests__/models/TestUser';

test('model', () => {
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
