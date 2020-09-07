import moment, {Moment} from 'moment';
import {deserialize, serialize} from 'react3l/helpers/serialization';
import {standardDateTime} from 'react3l/helpers/time';
import {TIMEZONE_OFFSET} from 'react3l/config/consts';

test('serialize works', () => {
  const dateValue: string = '2020-06-28T17:23:54.235' + TIMEZONE_OFFSET;

  interface TestInterface {
    name: string;

    number: 1;

    date: Moment;

    dates: Moment[],
  }

  const input: TestInterface = {
    name: 'name',
    number: 1,
    date: moment(dateValue),
    dates: [
      moment(dateValue),
    ],
  };

  const serializedValue: TestInterface = serialize<TestInterface>(input);

  expect(serializedValue.date).toEqual(dateValue);
  expect(serializedValue.dates[0]).toEqual(dateValue);
  expect(serializedValue.name).toEqual(input.name);
  expect(serializedValue.number).toEqual(input.number);
});

test('deserialize works', () => {
  interface TestInterface {
    date: Moment | string;

    array: [string, Moment | string];

    object: {
      date: Moment | string;
    };
  }

  const dateValue: string = '2020-06-19T17:06:23.234Z';

  const input: TestInterface = {
    date: dateValue,

    array: [
      'simple string',
      dateValue,
    ],

    object: {
      date: dateValue,
    },
  };

  const deserializedValue: TestInterface = deserialize<TestInterface>(input);

  expect(standardDateTime(deserializedValue.date)).toEqual(dateValue);
  expect(standardDateTime(deserializedValue.object.date)).toEqual(dateValue);
  expect(standardDateTime(deserializedValue.array[1])).toEqual(dateValue);
  expect(deserializedValue.array[0]).toEqual(input.array[0]);
});
