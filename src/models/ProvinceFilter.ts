import {ModelFilter} from 'core/models/ModelFilter';
import {DateFilter, IdFilter, StringFilter} from 'core/filters';

export class ProvinceFilter extends ModelFilter {
  public id: IdFilter = new IdFilter();

  public name: StringFilter = new StringFilter();

  public code: StringFilter = new StringFilter();

  public provinceTypeId: IdFilter = new IdFilter();

  public createdAt: DateFilter = new DateFilter();
}
