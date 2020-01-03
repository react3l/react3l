import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ItemVoucherSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public itemId?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public merchantAddressCode?: StringFilter = new StringFilter();

  public customerCode?: StringFilter = new StringFilter();

  public statusId?: IdFilter = new IdFilter();

  public orderId?: IdFilter = new IdFilter();
}
