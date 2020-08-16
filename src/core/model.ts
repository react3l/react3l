import {ErrorMap} from 'core/error-map';
import {Typing} from 'helpers/typing';

/**
 * App model
 */
export class Model {
  public static clone<T>(partial: Partial<T>) {
    const instance = new this();
    if (Typing.isObject(partial)) {
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
