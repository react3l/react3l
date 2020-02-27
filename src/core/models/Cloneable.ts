import {PureModelData} from 'react3l';

export class Cloneable {
  public static clone<T extends Cloneable>(model?: PureModelData<T>): T {
    const instance: T = new Cloneable() as T;
    if (typeof model === 'object' && model !== null) {
      Object.assign(instance, model);
    }
    return instance;
  }
}
