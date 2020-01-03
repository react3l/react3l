import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class MerchantAddressSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public merchantId?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public address?: StringFilter = new StringFilter();

  public contact?: StringFilter = new StringFilter();

  public phone?: StringFilter = new StringFilter();
}
