import {IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class OrderContentSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public orderId?: IdFilter = new IdFilter();

  public itemId?: IdFilter = new IdFilter();

  public discountPrice?: NumberFilter = new NumberFilter();

  public quantity?: NumberFilter = new NumberFilter();

  public voucherCode?: StringFilter = new StringFilter();
}
