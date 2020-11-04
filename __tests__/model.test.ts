import { Model } from '@react3l/react3l/core';
import { Entity, Field, Relation } from '@react3l/react3l/decorators';
import { keyExtractor } from '@react3l/react3l/helpers';
import moment, { Moment } from 'moment';

test('Model and decorators', () => {
  @Entity()
  class Test extends Model {
    @Field(Number)
    public id?: number;

    @Field(String)
    public code?: string;

    @Field(moment)
    public birthday?: Moment;

    @Relation(Test)
    public subTest?: Test;
  }

  const test: Test = new Test({
    id: '123',
    code: 123,
    birthday: '2020-11-03',
    subTest: {
      id: '124',
      code: 124,
      birthday: '2020-11-04',
    },
  });

  expect(test.id).toEqual(123);
  expect(test.code).toEqual('123');
  expect(test.birthday.format('YYYY-MM-DD')).toEqual('2020-11-03');

  expect(test.subTest.id).toEqual(124);
  expect(test.subTest.code).toEqual('124');
  expect(test.subTest.birthday.format('YYYY-MM-DD')).toEqual('2020-11-04');

  expect(test.subTest).toBeInstanceOf(Test);
});

test('Model helper', () => {
  expect(keyExtractor({
    id: 123,
  })).toEqual('123');
});
