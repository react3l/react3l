import {Search} from 'core/models/Search';

export class OrderContentSearch extends Search {

  public id?: number;

  public orderId?: number;

  public itemId?: number;

  public price?: number;

  public discountPrice?: number;

  public quantity?: number;

  public disabled?: boolean;

}
