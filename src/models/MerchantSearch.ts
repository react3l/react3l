import {Search} from 'core/models/Search';

export class MerchantSearch extends Search {

  public id?: number;

  public name?: string;

  public phone?: string;

  public contactPerson?: string;

  public address?: string;

  public provinceId?: number;

  public statusId?: number;

  public disabled?: boolean;

}
