import {translate} from '../helpers/internationalization';
import {FilterType} from 'react3l';
import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class IdFilter extends Filter {
  public static types(filter?: IdFilter): FilterType<IdFilter>[] {
    return [
      {
        key: nameof(filter.equal),
        label: translate('filters.idFilter.equal'),
      },
      {
        key: nameof(filter.notEqual),
        label: translate('filters.idFilter.notEqual'),
      },
      {
        key: nameof(filter.in),
        label: translate('filters.idFilter.in'),
      },
      {
        key: nameof(filter.notIn),
        label: translate('filters.idFilter.notIn'),
      },
    ];
  }

  public equal?: number;

  public notEqual?: number;

  public in?: number[];

  public notIn?: number[];
}
