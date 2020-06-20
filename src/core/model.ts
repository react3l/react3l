import {ErrorMap} from 'core/error-map';

export abstract class Model {
  errors?: ErrorMap<this>;

  public static clone<T extends Model>(ModelClass: new () => T, t?: Partial<T>): T {
    return {
      ...new ModelClass(),
      ...(t ?? {}),
    };
  }
}
