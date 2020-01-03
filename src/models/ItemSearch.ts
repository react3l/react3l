import {IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ItemSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public productId?: IdFilter = new IdFilter();

  public firstVariation?: StringFilter = new StringFilter();

  public secondVariation?: StringFilter = new StringFilter();

  public sKU?: StringFilter = new StringFilter();

  public price?: NumberFilter = new NumberFilter();

  public minPrice?: NumberFilter = new NumberFilter();

  public userPrice?: NumberFilter = new NumberFilter();

  public customerPrice?: NumberFilter = new NumberFilter();

  public quantity?: NumberFilter = new NumberFilter();
}
