import {PureModelData} from 'core/types';

export class Cloneable {
  public static clone<T extends Cloneable>(model?: PureModelData<T>): T {
    const instance: T = new Cloneable() as T;
    if (typeof model !== 'undefined' && model !== null) {
      Object.assign(instance, model);
    }
    return instance;
  }
}
