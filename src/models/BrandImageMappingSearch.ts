import {IdFilter} from 'core/filters';
import {Search} from 'core/models';

export class BrandImageMappingSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public brandId?: IdFilter = new IdFilter();

  public imageFileId?: IdFilter = new IdFilter();
}
