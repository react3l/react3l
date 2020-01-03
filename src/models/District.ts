import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Province} from './Province';

export class District extends Model {

  public static clone<T extends Model = District>(district?: PureModelData<District>): T | null {
    const instance: T = new Model() as T;
    if (typeof district !== 'undefined' && district !== null) {
      Object.assign(instance, {
        ...district,

        province: Province.clone<Province>(district.province),

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public name?: string;

  public orderNumber?: number;

  public provinceId?: number;

  public province?: Province;

  public errors?: ErrorMap<District>;
}
