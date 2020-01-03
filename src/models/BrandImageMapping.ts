import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Brand} from './Brand';
import {ImageFile} from './ImageFile';

export class BrandImageMapping extends Model {

  public static clone<T extends Model = BrandImageMapping>(brandImageMapping?: PureModelData<BrandImageMapping>): T | null {
    const instance: T = new Model() as T;
    if (typeof brandImageMapping !== 'undefined' && brandImageMapping !== null) {
      Object.assign(instance, {
        ...brandImageMapping,

        brand: Brand.clone<Brand>(brandImageMapping.brand),

        imageFile: ImageFile.clone<ImageFile>(brandImageMapping.imageFile),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public brandId?: number;

  public imageFileId?: number;

  public brand?: Brand;

  public imageFile?: ImageFile;

  public errors?: ErrorMap<BrandImageMapping>;
}
