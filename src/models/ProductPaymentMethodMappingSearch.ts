import {IdFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProductPaymentMethodMappingSearch extends Search {
  public productId?: IdFilter = new IdFilter();

  public paymentMethodId?: IdFilter = new IdFilter();
}
