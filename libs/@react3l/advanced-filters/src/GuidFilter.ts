import { AdvancedFilter } from './AdvancedFilter';

export class GuidFilter extends AdvancedFilter implements AdvancedFilter.IdFilter<AdvancedFilter.Guid> {
  public equal?: AdvancedFilter.Guid;

  public in?: AdvancedFilter.Guid[];

  public notEqual?: AdvancedFilter.Guid;

  public notIn?: AdvancedFilter.Guid[];

  constructor(fields?: Partial<GuidFilter> | undefined) {
    super();
    if (typeof fields === 'object') {
      Object.assign<GuidFilter, Partial<GuidFilter>>(this, fields);
    }
  }
}
