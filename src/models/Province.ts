import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class Province extends Model {

  public static clone<T extends Model = Province>(province?: PureModelData<Province>): T | null {
    const instance: T = new Model() as T;
    if (typeof province !== 'undefined' && province !== null) {
      Object.assign(instance, {
        ...province,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public name?: string;

  public orderNumber?: number;

  public errors?: ErrorMap<Province>;
}
