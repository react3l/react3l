import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {District} from './District';

export class Province extends Model {
  public static clone<T extends Model = Province>(province?: PureModelData<Province>): T | null {
    const instance: T = new Model() as T;
    if (typeof province !== 'undefined' && province !== null) {
      Object.assign(instance, {
        ...province,

        districts: province.districts?.map((district: District) => District.clone<District>(district)),
      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public code?: string;

  public name?: string;

  public districts?: District[];

  public errors?: ErrorMap<Province>;
}
