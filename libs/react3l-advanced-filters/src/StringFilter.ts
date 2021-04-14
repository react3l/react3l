import { AdvancedFilter } from './AdvancedFilter';

export class StringFilter
  extends AdvancedFilter
  implements AdvancedFilter.StringFilter {
  public contain?: string;

  public endWith?: string;

  public equal?: string;

  public notContain?: string;

  public notEndWith?: string;

  public notEqual?: string;

  public notStartWith?: string;

  public startWith?: string;

  constructor(fields?: Partial<StringFilter> | undefined) {
    super();
    if (typeof fields === 'object') {
      Object.assign<StringFilter, Partial<StringFilter>>(this, fields);
    }
  }
}
