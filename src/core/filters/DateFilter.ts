import {Filter} from 'core/filters/Filter';
import {translate} from '../helpers/internationalization';
import {FilterType} from 'react3l';
import {Moment} from 'moment';
import nameof from 'ts-nameof.macro';

export class DateFilter extends Filter {
  public static types(filter?: DateFilter): FilterType<DateFilter>[] {
    return [
      {
        key: nameof(filter.equal),
        label: translate('filters.dateFilter.equal'),
      },
      {
        key: nameof(filter.notEqual),
        label: translate('filters.dateFilter.notEqual'),
      },
      {
        key: nameof(filter.greater),
        label: translate('filters.dateFilter.greater'),
      },
      {
        key: nameof(filter.greaterEqual),
        label: translate('filters.dateFilter.greaterEqual'),
      },
      {
        key: nameof(filter.less),
        label: translate('filters.dateFilter.less'),
      },
      {
        key: nameof(filter.lessEqual),
        label: translate('filters.dateFilter.lessEqual'),
      },
      {
        key: nameof(filter.range),
        label: translate('filters.dateFilter.range'),
      },
    ];
  }

  public equal?: Moment;

  public notEqual?: Moment;

  public greater?: Moment;

  public greaterEqual?: Moment;

  public less?: Moment;

  public lessEqual?: Moment;

  public range?: [Moment | null, Moment | null];
}
