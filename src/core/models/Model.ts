import {ErrorMap} from '../types';
import {Cloneable} from './Cloneable';

export class Model extends Cloneable {
  public errors?: ErrorMap<Model>;

  public key?: string | number;

  [key: string]: any;

  constructor(model?: Model) {
    super();
    if (model !== null && typeof model === 'object') {
      Object.assign(this, model);
    }
  }
}
