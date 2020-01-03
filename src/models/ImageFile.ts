import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Brand} from './Brand';
import {Product} from './Product';

export class ImageFile extends Model {

  public static clone<T extends Model = ImageFile>(imageFile?: PureModelData<ImageFile>): T | null {
    const instance: T = new Model() as T;
    if (typeof imageFile !== 'undefined' && imageFile !== null) {
      Object.assign(instance, {
        ...imageFile,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public key?: string;

  public name?: string;

  public url?: string;

  public thumbUrl?: string;

  public originUrl?: string;

  public brands?: Brand[];

  public products?: Product[];

  public errors?: ErrorMap<ImageFile>;
}
