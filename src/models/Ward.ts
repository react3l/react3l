import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {District} from './District';

export class Ward extends Model {
  public static clone<T extends Model = Ward>(ward?: PureModelData<Ward>): T | null {
    const instance: T = new Model() as T;
    if (typeof ward !== 'undefined' && ward !== null) {
      Object.assign(instance, {
        ...ward,

        district: District?.clone<District>(ward.district),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public districtId?: number;

  public district?: District;

  public errors?: ErrorMap<Ward>;
}
