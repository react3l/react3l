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
});
