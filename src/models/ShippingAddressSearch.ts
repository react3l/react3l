import {Search} from 'core/models/Search';

export class ShippingAddressSearch extends Search {

  public id?: number;

  public customerId?: number;

  public fullName?: string;

  public companyName?: string;

  public phoneNumber?: string;

  public provinceId?: number;

  public districtId?: number;

  public wardId?: number;

  public address?: string;

  public isDefault?: boolean;

}
