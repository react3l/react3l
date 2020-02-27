import {DEFAULT_TAKE} from '../config';
import {Cloneable} from './Cloneable';
import {PureModelData} from 'react3l';

export class ModelFilter extends Cloneable {
  public static clone<T extends ModelFilter>(model?: PureModelData<T>): T {
    const instance: T = new ModelFilter() as T;
    if (typeof model === 'object' && model !== null) {
      Object.assign(instance, model);
    }
    return instance;
  }

  public skip?: number = 0;

  public take?: number = DEFAULT_TAKE;

  public orderBy?: string;

  public orderType?: string;
}
