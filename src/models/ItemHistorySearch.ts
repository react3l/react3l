import {DateFilter, IdFilter, NumberFilter} from 'core/filters';
import {Search} from 'core/models';

export class ItemHistorySearch extends Search {
  public id?: IdFilter = new IdFilter();

  public itemId?: IdFilter = new IdFilter();

  public price?: NumberFilter = new NumberFilter();

  public minPrice?: NumberFilter = new NumberFilter();

  public userPrice?: NumberFilter = new NumberFilter();

  public customerPrice?: NumberFilter = new NumberFilter();

  public stock?: NumberFilter = new NumberFilter();

  public createdDate?: DateFilter = new DateFilter();

  public administratorId?: IdFilter = new IdFilter();
}
