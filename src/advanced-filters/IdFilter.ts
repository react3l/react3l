import { AdvancedFilter } from './AdvancedFilter';

export class IdFilter
  extends AdvancedFilter
  implements AdvancedFilter.IdFilter<number> {
  public in?: number[];

  public notIn?: number[];

  public equal?: number;

  public notEqual?: number;

  constructor(fields?: Partial<IdFilter>) {
    super();
    if (typeof fields === 'object') {
      Object.assign<IdFilter, Partial<IdFilter>>(this, fields);
    }
  }
}
