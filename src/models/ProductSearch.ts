import {DateFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProductSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public slug?: StringFilter = new StringFilter();

  public description?: StringFilter = new StringFilter();

  public typeId?: IdFilter = new IdFilter();

  public statusId?: IdFilter = new IdFilter();

  public merchantId?: IdFilter = new IdFilter();

  public categoryId?: IdFilter = new IdFilter();

  public brandId?: IdFilter = new IdFilter();

  public keyFeatures?: StringFilter = new StringFilter();

  public warrantyPolicy?: StringFilter = new StringFilter();

  public returnPolicy?: StringFilter = new StringFilter();

  public expiredDate?: DateFilter = new DateFilter();

  public conditionOfUse?: StringFilter = new StringFilter();

  public maximumPurchaseQuantity?: NumberFilter = new NumberFilter();

  public firstVariationGroupingName?: StringFilter = new StringFilter();

  public firstVariationGroupingValue?: StringFilter = new StringFilter();

  public secondVariationGroupingName?: StringFilter = new StringFilter();

  public secondVariationGroupingValue?: StringFilter = new StringFilter();
}
