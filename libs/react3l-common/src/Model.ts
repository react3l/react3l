import { ObjectField, ObjectList } from 'react3l-decorators';

export declare namespace Model {
  /**
   * Model errors
   *
   * @param T {Model}
   */
  export type Errors<T extends Model> = Record<Exclude<keyof T, 'errors'>,
    string>;
}

export class Model {
  public errors?: Model.Errors<Model>;

  /**
   * Create an instance of this class with its prototype
   */
  public static create<T = Model>(): T {
    return Object.create(this.prototype);
  }

  /**
   * Used for circular relationship only.
   *
   * @param Parent
   * @param Child
   * @param field
   */
  public static hasMany<T1 extends Model, T2 extends Model>(
    Parent: new () => T1,
    Child: new () => T2,
    field: keyof T1
  ): void {
    ObjectList(Child)(Parent.prototype, field as string);
  }

  /**
   * Used for circular relationship only.
   *
   * @param Child
   * @param Parent
   * @param field
   */
  public static belongsTo<T1 extends Model, T2 extends Model>(
    Child: new () => T1,
    Parent: new () => T2,
    field: keyof T1
  ): void {
    ObjectField(Parent)(Child.prototype, field as string);
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

