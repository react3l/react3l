import {Search} from 'core/models/Search';

export class MerchantAddressSearch extends Search {

  public id?: number;

  public merchantId?: number;

  public code?: string;

  public address?: string;

  public contact?: string;

  public phone?: string;

  public disabled?: boolean;

}
