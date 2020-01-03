import {DateFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class OrderSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public customerId?: IdFilter = new IdFilter();

  public createdDate?: DateFilter = new DateFilter();

  public couponCode?: StringFilter = new StringFilter();

  public total?: NumberFilter = new NumberFilter();

  public couponAmount?: NumberFilter = new NumberFilter();

  public statusId?: IdFilter = new IdFilter();

  public address?: StringFilter = new StringFilter();

  public provinceId?: IdFilter = new IdFilter();

  public districtId?: IdFilter = new IdFilter();

  public wardId?: IdFilter = new IdFilter();

  public phoneNumber?: StringFilter = new StringFilter();

  public paymentMethodId?: IdFilter = new IdFilter();
}
