import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {BannerType} from './BannerType';
import {ImageFile} from './ImageFile';

export class Banner extends Model {

  public static clone<T extends Model = Banner>(banner?: PureModelData<Banner>): T | null {
    const instance: T = new Model() as T;
    if (typeof banner !== 'undefined' && banner !== null) {
      Object.assign(instance, {
        ...banner,

        image: ImageFile.clone<ImageFile>(banner.image),

        type: BannerType.clone<BannerType>(banner.type),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public src?: string;

  public alt?: string;

  public caption?: string;

  public link?: string;

  public priority?: number;

  public typeId?: number;

  public imageId?: number;

  public image?: ImageFile;

  public type?: BannerType;

  public errors?: ErrorMap<Banner>;
}
