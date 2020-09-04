import {TypeChecking} from 'helpers/type-checking';

export class Cloneable {
  /**
   * Clone a model instance
   *
   * @param {Partial<T>} partial
   * @return {Model}
   */
  public static clone<T extends Cloneable>(partial: Partial<T>) {
    const instance = new this();
    if (TypeChecking.isObject(partial)) {
      Object.assign(instance, partial);
    }
    return instance;
  }
}
