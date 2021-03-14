import { AdvancedFilter } from './AdvancedFilter';

export class NumberFilter
  extends AdvancedFilter
  implements AdvancedFilter.NumberFilter<number> {
  public equal?: number;

  public greater?: number;

  public greaterEqual?: number;

  public less?: number;

  public lessEqual?: number;

  public notEqual?: number;

  constructor(fields?: Partial<NumberFilter> | undefined) {
    super();
    if (typeof fields === 'object') {
      Object.assign<NumberFilter, Partial<NumberFilter>>(this, fields);
    }
  }
}
