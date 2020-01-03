import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class Administrator extends Model {

  public static clone<T extends Model = Administrator>(administrator?: PureModelData<Administrator>): T | null {
    const instance: T = new Model() as T;
    if (typeof administrator !== 'undefined' && administrator !== null) {
      Object.assign(instance, {
        ...administrator,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public username?: string;

  public displayName?: string;

  public picture?: string;

  public errors?: ErrorMap<Administrator>;
}
