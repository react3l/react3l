import {Search} from 'core/models/Search';
import {PureModelData} from 'core/types';

export class ProductSearch extends Search {

  public static clone<T extends Search = ProductSearch>(
    productSearch?: PureModelData<T>,
  ): T | null {
    const instance: T = new Search() as T;
    if (typeof productSearch !== 'undefined' && productSearch !== null) {
      Object.assign(instance, productSearch);
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

  public expiredDate?: string;

  public conditionOfUse?: string;

  public maximumPurchaseQuantity?: number;

  public disabled?: boolean;
}
