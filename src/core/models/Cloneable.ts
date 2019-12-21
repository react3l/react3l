export class Cloneable {
  public static clone<T extends Cloneable>(model?: T): T {
    const instance: T = new Cloneable() as T;
    if (typeof model !== 'undefined' && model !== null) {
      Object.assign(instance, model);
    }
    return instance;
  }
}
