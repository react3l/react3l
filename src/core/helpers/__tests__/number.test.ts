import {isValidNumbers} from '../number';

describe('number helpers', () => {
  it('numbers', () => {
    expect(isValidNumbers(1)).toBeTruthy();
    expect(isValidNumbers(NaN)).toBeFalsy();
    expect(isValidNumbers(undefined)).toBeFalsy();
    expect(isValidNumbers(null)).toBeFalsy();
  });
});
