import moment, {Moment} from 'moment';
import {deserialize, serialize} from '@react3l/react3l/helpers/serialization';
import {standardDateTime} from '@react3l/react3l/helpers/time';
import {TIMEZONE_OFFSET} from '@react3l/react3l/config/consts';

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

  expect(moment(serializedValue.date).toDate().getTime()).toEqual(new Date(dateValue).getTime());
  expect(moment(serializedValue.dates[0]).toDate().getTime()).toEqual(new Date(dateValue).getTime());
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

  const dateValue: string = '2020-06-19T17:06:23.234' + TIMEZONE_OFFSET;

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

  expect(new Date(standardDateTime(deserializedValue.date)).getTime()).toEqual(new Date(dateValue).getTime());
  expect(new Date(standardDateTime(deserializedValue.object.date)).getTime()).toEqual(new Date(dateValue).getTime());
  expect(new Date(standardDateTime(deserializedValue.array[1])).getTime()).toEqual(new Date(dateValue).getTime());
  expect(deserializedValue.array[0]).toEqual(input.array[0]);
});
