import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ShippingAddressSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public customerId?: IdFilter = new IdFilter();

  public fullName?: StringFilter = new StringFilter();

  public companyName?: StringFilter = new StringFilter();

  public phoneNumber?: StringFilter = new StringFilter();

  public provinceId?: IdFilter = new IdFilter();

  public districtId?: IdFilter = new IdFilter();

  public wardId?: IdFilter = new IdFilter();

  public address?: StringFilter = new StringFilter();
}
