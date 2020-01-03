import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class BannerType extends Model {

  public static clone<T extends Model = BannerType>(bannerType?: PureModelData<BannerType>): T | null {
    const instance: T = new Model() as T;
    if (typeof bannerType !== 'undefined' && bannerType !== null) {
      Object.assign(instance, {
        ...bannerType,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public errors?: ErrorMap<BannerType>;
}
