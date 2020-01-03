import {IdFilter} from 'core/filters';
import {Search} from 'core/models';

export class CouponItemMappingSearch extends Search {
  public couponId?: IdFilter = new IdFilter();

  public itemId?: IdFilter = new IdFilter();
}
