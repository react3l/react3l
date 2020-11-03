import { TypeChecking } from '@react3l/react3l/helpers/type-checking';

/**
 * @deprecated Cloneable is deprecated due to new decorator feature and will be removed in future release.
 */
export class Cloneable {
  /**
   * Clone a model instance
   *
   * @param {Partial<T>} partial
   * @return {Model}
   *
   * @deprecated clone is deprecated. New Model class will be handled using decorators
   */
  public static clone<T extends Cloneable>(partial: Partial<T>) {
    const instance = new this();
    if (TypeChecking.isObject(partial)) {
      Object.assign(instance, partial);
    }
    return instance;
  }
}
