import {Search} from 'core/models/Search';

export class ProductSearch extends Search {

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
