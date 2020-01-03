import {IdFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProductImageMappingSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public productId?: IdFilter = new IdFilter();

  public imageFileId?: IdFilter = new IdFilter();
}
