import 'reflect-metadata';

export class Model {
  public static create() {
    return Object.create(this.prototype);
  }
}
