import {translate} from '../helpers/internationalization';
import {FilterType} from 'react3l';
import nameof from 'ts-nameof.macro';
import {Filter} from '../filters/Filter';

export class NumberFilter extends Filter {
  public static types(filter?: NumberFilter): FilterType<NumberFilter>[] {
    return [
      {
        key: nameof(filter.equal),
        label: translate('filters.numberFilter.equal'),
      },
      {
        key: nameof(filter.notEqual),
        label: translate('filters.numberFilter.notEqual'),
      },
      {
        key: nameof(filter.greater),
        label: translate('filters.numberFilter.greater'),
      },
      {
        key: nameof(filter.greaterEqual),
        label: translate('filters.numberFilter.greaterEqual'),
      },
      {
        key: nameof(filter.less),
        label: translate('filters.numberFilter.less'),
      },
      {
        key: nameof(filter.lessEqual),
        label: translate('filters.numberFilter.lessEqual'),
      },
      {
        key: nameof(filter.range),
        label: translate('filters.numberFilter.range'),
      },
    ];
  }

  public equal?: number;

  public notEqual?: number;

  public greater?: number;

  public greaterEqual?: number;

  public less?: number;

  public lessEqual?: number;

  public range?: [number | undefined, number | undefined];
}
