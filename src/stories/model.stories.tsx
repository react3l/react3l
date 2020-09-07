import React from 'react';
import { TestUser } from '@react3l/react3l/__tests__/models/TestUser';

export default {
  title: 'Model',
};

export function SampleModel() {
  const user1: TestUser = React.useRef<TestUser>(new TestUser()).current;

  const user2: TestUser = React.useRef<TestUser>(TestUser.clone<TestUser>({
    name: 'User 2',
  })).current;

  return (
    <>
      <p>
        user instanceof TestUser: {user1 instanceof TestUser ? 'true' : 'false'}
      </p>
      <p>
        user2's name: {user2.name}
      </p>
      <p>
        user2 instanceof TestUser: {user2 instanceof TestUser ? 'true' : 'false'}
      </p>
    </>
  );
}
