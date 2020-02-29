import {translate} from '../helpers/internationalization';
import {FilterType} from 'react3l';
import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class StringFilter extends Filter {
  public static types(filter?: StringFilter): FilterType<StringFilter>[] {
    return [
      {
        key: nameof(filter.startWith),
        label: translate('filters.stringFilter.startWith'),
      },
      {
        key: nameof(filter.notStartWith),
        label: translate('filters.stringFilter.notStartWith'),
      },
      {
        key: nameof(filter.endWith),
        label: translate('filters.stringFilter.endWith'),
      },
      {
        key: nameof(filter.notEndWith),
        label: translate('filters.stringFilter.notEndWith'),
      },
      {
        key: nameof(filter.contain),
        label: translate('filters.stringFilter.contain'),
      },
      {
        key: nameof(filter.notContain),
        label: translate('filters.stringFilter.notContain'),
      },
      {
        key: nameof(filter.equal),
        label: translate('filters.stringFilter.equal'),
      },
      {
        key: nameof(filter.notEqual),
        label: translate('filters.stringFilter.notEqual'),
      },
    ];
  }

  public startWith?: string;

  public notStartWith?: string;

  public endWith?: string;

  public notEndWith?: string;

  public equal?: string;

  public notEqual?: string;

  public contain?: string;

  public notContain?: string;
}
