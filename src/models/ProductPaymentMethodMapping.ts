import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {PaymentMethod} from './PaymentMethod';
import {Product} from './Product';

export class ProductPaymentMethodMapping extends Model {

  // tslint:disable-next-line:max-line-length
  public static clone<T extends Model = ProductPaymentMethodMapping>(productPaymentMethodMapping?: PureModelData<ProductPaymentMethodMapping>): T | null {
    const instance: T = new Model() as T;
    if (typeof productPaymentMethodMapping !== 'undefined' && productPaymentMethodMapping !== null) {
      Object.assign(instance, {
        ...productPaymentMethodMapping,

        paymentMethod: PaymentMethod.clone<PaymentMethod>(productPaymentMethodMapping.paymentMethod),

        product: Product.clone<Product>(productPaymentMethodMapping.product),
      });
      return instance;
    }
    return null;
  }

  public productId?: number;

  public paymentMethodId?: number;

  public paymentMethod?: PaymentMethod;

  public product?: Product;

  public errors?: ErrorMap<ProductPaymentMethodMapping>;
}
