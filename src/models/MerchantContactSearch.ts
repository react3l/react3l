import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class MerchantContactSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public merchantId?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public email?: StringFilter = new StringFilter();

  public phone?: StringFilter = new StringFilter();

  public note?: StringFilter = new StringFilter();
}
