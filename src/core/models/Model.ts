import {ErrorMap} from 'core/types';
import {Cloneable} from './Cloneable';

export class Model extends Cloneable {
  public errors?: ErrorMap<Model>;

  [key: string]: any;
}
