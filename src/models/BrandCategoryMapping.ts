import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Brand} from './Brand';
import {Category} from './Category';

export class BrandCategoryMapping extends Model {

  public static clone<T extends Model = BrandCategoryMapping>(brandCategoryMapping?: PureModelData<BrandCategoryMapping>): T | null {
    const instance: T = new Model() as T;
    if (typeof brandCategoryMapping !== 'undefined' && brandCategoryMapping !== null) {
      Object.assign(instance, {
        ...brandCategoryMapping,

        brand: Brand.clone<Brand>(brandCategoryMapping.brand),

        category: Category.clone<Category>(brandCategoryMapping.category),
      });
      return instance;
    }
    return null;
  }

  public brandId?: number;

  public categoryId?: number;

  public brand?: Brand;

  public category?: Category;

  public errors?: ErrorMap<BrandCategoryMapping>;
}
