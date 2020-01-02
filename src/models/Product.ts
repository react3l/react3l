import {Model, PureModelData} from 'core';
import {Brand} from 'models/Brand';
import {Category} from 'models/Category';
import {EVoucher} from 'models/EVoucher';
import {Item} from 'models/Item';
import {Merchant} from 'models/Merchant';
import {ProductStatus} from 'models/ProductStatus';
import {ProductType} from 'models/ProductType';
import {VariationGrouping} from 'models/VariationGrouping';
import moment, {Moment} from 'moment';

export class Product extends Model {

  public static clone<T extends Model = Product>(product?: PureModelData<Product>): T | null {
    const instance: T = new Model() as T;
    if (typeof product !== 'undefined' && product !== null) {
      Object.assign(instance, {
        ...product,
        expiredDate: moment(product.expiredDate), // Optional
        items: product.items.map((item: Item) => Item.clone<Item>(item)),
        type: ProductType.clone<ProductType>(product.type),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public description?: string;

  public typeId?: number;

  public statusId?: number;

  public merchantId?: number;

  public categoryId?: number;

  public brandId?: number;

  public warrantyPolicy?: string;

  public returnPolicy?: string;

  public expiredDate?: Moment;

  public conditionOfUse?: string;

  public maximumPurchaseQuantity?: number;

  public disabled?: boolean;

  public brand?: Brand;

  public category?: Category;

  public merchant?: Merchant;

  public status?: ProductStatus;

  public type?: ProductType;

  public eVouchers?: EVoucher[];

  public items?: Item[];

  public variationGroupings?: VariationGrouping[];

  public constructor(product?: Product) {
    super(product);
  }
}
