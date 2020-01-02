import {Search} from 'core/models/Search';
import {Moment} from 'moment';

export class OrderSearch extends Search {

  public id?: number;

  public customerId?: number;

  public createdDate?: string | Date | Moment;

  public couponCode?: string;

  public totalPrice?: number;

  public discountPrice?: number;

  public statusId?: number;

  public address?: string;

  public provinceId?: number;

  public districtId?: number;

  public wardId?: number;

  public phoneNumber?: string;

  public paymentMethodId?: number;

}
