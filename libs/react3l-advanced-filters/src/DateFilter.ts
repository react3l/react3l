import { AdvancedFilter } from './AdvancedFilter';
import type { Moment } from 'moment';

export class DateFilter
  extends AdvancedFilter
  implements AdvancedFilter.NumberFilter<Moment> {
  public equal?: Moment;

  public greater?: Moment;

  public greaterEqual?: Moment;

  public less?: Moment;

  public lessEqual?: Moment;

  public notEqual?: Moment;

  constructor(fields?: Partial<DateFilter> | undefined) {
    super();
    if (typeof fields === 'object') {
      Object.assign<DateFilter, Partial<DateFilter>>(this, fields);
    }
  }
}
