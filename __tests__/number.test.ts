import { isValidNumber, numberWithCommas } from '@react3l/react3l/helpers';

test('Number helper', () => {
  expect(isValidNumber(NaN)).toBeFalsy();
  expect(isValidNumber(123)).toBeTruthy();

  expect(numberWithCommas(100000)).toEqual('100,000');
});
