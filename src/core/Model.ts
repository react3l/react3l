import 'reflect-metadata';
import moment, {Moment} from 'moment';

export class Model {
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
}
