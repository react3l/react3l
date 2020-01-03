import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {ImageFile} from './ImageFile';
import {Product} from './Product';

export class ProductImageMapping extends Model {

  public static clone<T extends Model = ProductImageMapping>(productImageMapping?: PureModelData<ProductImageMapping>): T | null {
    const instance: T = new Model() as T;
    if (typeof productImageMapping !== 'undefined' && productImageMapping !== null) {
      Object.assign(instance, {
        ...productImageMapping,

        imageFile: ImageFile.clone<ImageFile>(productImageMapping.imageFile),

        product: Product.clone<Product>(productImageMapping.product),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public productId?: number;

  public imageFileId?: number;

  public imageFile?: ImageFile;

  public product?: Product;

  public errors?: ErrorMap<ProductImageMapping>;
}
