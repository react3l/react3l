import {ErrorMap} from 'core/error-map';

/**
 * App model
 */
export class Model {
  public static clone<T>(partial: Partial<T>) {
    const instance = new this();
    if (typeof partial === 'object' && partial !== null) {
      Object.assign(instance, partial);
    }
    return instance;
  }

  /**
   * Backend validation errors
   *
   * @type {ErrorMap<Model>}
   */
  public errors?: ErrorMap<Model>;

  /**
   * Model fields
   *
   * @type {any}
   */
  [key: string]: any;
}
