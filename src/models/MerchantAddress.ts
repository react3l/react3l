import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Merchant} from './Merchant';
import {Product} from './Product';

export class MerchantAddress extends Model {

  public static clone<T extends Model = MerchantAddress>(merchantAddress?: PureModelData<MerchantAddress>): T | null {
    const instance: T = new Model() as T;
    if (typeof merchantAddress !== 'undefined' && merchantAddress !== null) {
      Object.assign(instance, {
        ...merchantAddress,

        merchant: Merchant.clone<Merchant>(merchantAddress.merchant),

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public merchantId?: number;

  public code?: string;

  public address?: string;

  public contact?: string;

  public phone?: string;

  public disabled?: boolean;

  public merchant?: Merchant;

  public products?: Product[];

  public errors?: ErrorMap<MerchantAddress>;
}
