import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class MerchantSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public phone?: StringFilter = new StringFilter();

  public contactPerson?: StringFilter = new StringFilter();

  public address?: StringFilter = new StringFilter();

  public provinceId?: IdFilter = new IdFilter();

  public statusId?: IdFilter = new IdFilter();
}
