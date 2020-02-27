import {ErrorMap} from 'react3l';
import {Cloneable} from './Cloneable';

export class Model extends Cloneable {
  public errors?: ErrorMap<Model>;

  [key: string]: any;
}
