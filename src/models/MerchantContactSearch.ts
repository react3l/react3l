import {Search} from 'core/models/Search';

export class MerchantContactSearch extends Search {

  public id?: number;

  public merchantId?: number;

  public name?: string;

  public email?: string;

  public phone?: string;

  public note?: string;

  public disabled?: boolean;

}
