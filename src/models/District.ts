import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Province} from './Province';
import {Ward} from './Ward';

export class District extends Model {
  public static clone<T extends Model = District>(district?: PureModelData<District>): T | null {
    const instance: T = new Model() as T;
    if (typeof district !== 'undefined' && district !== null) {
      Object.assign(instance,
        {
          ...district,
          province: Province?.clone<Province>(district.province),
          wards: district.wards?.map((ward: Ward) => Ward.clone<Ward>(ward)),
        });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public provinceId?: number;

  public province?: Province;

  public wards?: Ward[];

  public errors?: ErrorMap<District>;
}
