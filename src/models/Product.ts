import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import moment, {Moment} from 'moment';
import {Brand} from './Brand';
import {Category} from './Category';
import {ImageFile} from './ImageFile';
import {Merchant} from './Merchant';
import {MerchantAddress} from './MerchantAddress';
import {PaymentMethod} from './PaymentMethod';
import {ProductStatus} from './ProductStatus';
import {ProductType} from './ProductType';

export class Product extends Model {

  public static clone<T extends Model = Product>(product?: PureModelData<Product>): T | null {
    const instance: T = new Model() as T;
    if (typeof product !== 'undefined' && product !== null) {
      Object.assign(instance, {
        ...product,

        expiredDate: moment(product.expiredDate),

        brand: Brand.clone<Brand>(product.brand),

        category: Category.clone<Category>(product.category),

        merchant: Merchant.clone<Merchant>(product.merchant),

        status: ProductStatus.clone<ProductStatus>(product.status),

        type: ProductType.clone<ProductType>(product.type),

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public name?: string;

  public slug?: string;

  public description?: string;

  public typeId?: number;

  public statusId?: number;

  public merchantId?: number;

  public categoryId?: number;

  public brandId?: number;

  public keyFeatures?: string;

  public warrantyPolicy?: string;

  public returnPolicy?: string;

  public expiredDate?: Moment;

  public conditionOfUse?: string;

  public maximumPurchaseQuantity?: number;

  public disabled?: boolean;

  public firstVariationGroupingName?: string;

  public firstVariationGroupingValue?: string;

  public secondVariationGroupingName?: string;

  public secondVariationGroupingValue?: string;

  public brand?: Brand;

  public category?: Category;

  public merchant?: Merchant;

  public status?: ProductStatus;

  public type?: ProductType;

  public imageFiles?: ImageFile[];

  public merchantAddresses?: MerchantAddress[];

  public paymentMethods?: PaymentMethod[];

  public errors?: ErrorMap<Product>;
}
