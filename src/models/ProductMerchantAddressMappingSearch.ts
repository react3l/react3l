import {IdFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProductMerchantAddressMappingSearch extends Search {
  public productId?: IdFilter = new IdFilter();

  public merchantAddressId?: IdFilter = new IdFilter();
}
