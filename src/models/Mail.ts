import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';

export class Mail extends Model {

  public static clone<T extends Model = Mail>(mail?: PureModelData<Mail>): T | null {
    const instance: T = new Model() as T;
    if (typeof mail !== 'undefined' && mail !== null) {
      Object.assign(instance, {
        ...mail,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public subject?: string;

  public body?: string;

  public receivers?: string;

  public tryCount?: number;

  public errorMessage?: string;

  public errors?: ErrorMap<Mail>;
}
