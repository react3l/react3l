export class Model {

  [key: string]: any;

  public errors?: { [key in keyof Model]: string } = {};

  public static clone<T extends Model>(model?: T): T {
    const instance: T = new Model() as T;
    if (typeof model !== 'undefined' && model !== null) {
      Object.assign(instance, model);
    }
    return instance;
  }
}
