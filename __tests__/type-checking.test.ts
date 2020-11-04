import { TypeChecking } from '@react3l/react3l/helpers';

test('TypeChecking', () => {
  // Array
  expect(TypeChecking.isArray([])).toBeTruthy();
  expect(TypeChecking.isObject([])).toBeTruthy();
  // Object
  expect(TypeChecking.isObject({})).toBeTruthy();
  expect(TypeChecking.isObject(null)).toBeFalsy();
  // Function
  expect(TypeChecking.isFunction(() => { })).toBeTruthy();
  // String
  expect(TypeChecking.isString('abc')).toBeTruthy();
  expect(TypeChecking.isString('')).toBeTruthy();
  expect(TypeChecking.isString(null)).toBeFalsy();
  expect(TypeChecking.isString(undefined)).toBeFalsy();
  // Number
  expect(TypeChecking.isNumber(123)).toBeTruthy();
  expect(TypeChecking.isNumber(NaN)).toBeTruthy();
  expect(TypeChecking.isNumber(null)).toBeFalsy();
  expect(TypeChecking.isNumber(undefined)).toBeFalsy();
});
