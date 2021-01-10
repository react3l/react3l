import moment from 'moment';
import type {Moment} from 'moment';
import 'reflect-metadata';

export class Model {
  /**
   * Registered model map
   *
   * @type {Record<string, Model>}
   */
  protected static registeredModels: Record<string, Model> = {};

  /**
   * Create a model instance with defined property descriptors
   *
   * @return {this}
   */
  public static create() {
    const instance = Object.create(this.prototype);
    Object.assign(instance, new this());
    return instance;
  }

  /**
   * Serialize this model to JSON string
   *
   * @return {string}
   */
  public toString(): string {
    return JSON.stringify(this, (key: string, value: any) => {
      if (value instanceof moment) {
        return (value as Moment).toISOString();
      }
      return value;
    });
  }

  /**
   * Register a model to map
   *
   * Each model can be registered only once.
   *
   * @param name  - Name of model to be registered
   * @param model - The model class to be registered
   */
  public static registerModel(name: string, model: typeof Model) {
    Object.defineProperty(this.registeredModels, name, {
      enumerable: true,
      configurable: false,
      writable: false,
      value: model,
    });
  }
}
