import {IdFilter} from 'core/filters';
import {Search} from 'core/models';

export class CouponCustomerMappingSearch extends Search {
  public couponId?: IdFilter = new IdFilter();

  public customerId?: IdFilter = new IdFilter();
}
