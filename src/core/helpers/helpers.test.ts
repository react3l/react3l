import {formatDate, formatDateTime, formatTime} from 'core/helpers/date-time';
import {debounce} from 'core/helpers/debounce';
import {flatten, unflatten} from 'core/helpers/json';
import {isValidNumbers} from 'core/helpers/number';
import {withTableFilterSuffix} from 'core/helpers/string';
import {translate} from 'core/helpers/translate';
import {renderMasterIndex} from 'core/helpers/view';

describe('Helper tests', () => {
  it('debounce works', () => {
    let x: number = 1;
    const updateX = debounce(() => {
      x = x + 1;
    });
    for (let i = 0; i < 10; i++) {
      updateX();
    }
    setTimeout(() => {
      expect(x).toEqual(2);
    }, 400);
  });

  it('numbers', () => {
    expect(isValidNumbers(1)).toBeTruthy();
    expect(isValidNumbers(NaN)).toBeFalsy();
    expect(isValidNumbers(undefined)).toBeFalsy();
    expect(isValidNumbers(null)).toBeFalsy();
  });

  it('string works', () => {
    expect(withTableFilterSuffix('id')).toEqual('id-filter');
  });

  it('translate', () => {
    expect(translate('key.subKey')).toEqual('key.subKey');
  });

  it('renderMasterIndex works', () => {
    expect(renderMasterIndex({})(1, {}, 1)).toEqual(2);
  });

  it('json works', () => {
    const nestedObject = {
      a: {
        b: 1,
      },
    };
    expect(flatten(nestedObject)['a.b']).toEqual(1);

    const flattenObject = {
      'a.b.c': 'string',
    };
    expect((unflatten(flattenObject) as any).a.b.c).toEqual('string');
  });

  it('date-time helpers', () => {
    const dateStr: string = '2019-11-01';
    const date: Date = new Date(dateStr);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    expect(formatDate(date)).toEqual(dateStr);
    expect(formatDateTime(date)).toEqual(`${dateStr} 00:00:00`);
    expect(formatTime(date)).toEqual('00:00:00');
  });
});
