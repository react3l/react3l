import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {MerchantAddress} from './MerchantAddress';
import {Product} from './Product';

export class ProductMerchantAddressMapping extends Model {

  public static clone<T extends Model = ProductMerchantAddressMapping>(productMerchantAddressMapping?: PureModelData<ProductMerchantAddressMapping>): T | null {
    const instance: T = new Model() as T;
    if (typeof productMerchantAddressMapping !== 'undefined' && productMerchantAddressMapping !== null) {
      Object.assign(instance, {
        ...productMerchantAddressMapping,

        merchantAddress: MerchantAddress.clone<MerchantAddress>(productMerchantAddressMapping.merchantAddress),

        product: Product.clone<Product>(productMerchantAddressMapping.product),
      });
      return instance;
    }
    return null;
  }

  public productId?: number;

  public merchantAddressId?: number;

  public merchantAddress?: MerchantAddress;

  public product?: Product;

  public errors?: ErrorMap<ProductMerchantAddressMapping>;
}
