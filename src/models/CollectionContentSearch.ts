import {IdFilter, NumberFilter} from 'core/filters';
import {Search} from 'core/models';

export class CollectionContentSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public collectionId?: IdFilter = new IdFilter();

  public priority?: NumberFilter = new NumberFilter();

  public productId?: IdFilter = new IdFilter();
}
