import {DateFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class EVoucherSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public customerId?: IdFilter = new IdFilter();

  public productId?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public start?: DateFilter = new DateFilter();

  public end?: DateFilter = new DateFilter();

  public quantity?: NumberFilter = new NumberFilter();
}
