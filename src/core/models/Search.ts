import {DEFAULT_TAKE} from '../config';
import {Cloneable} from './Cloneable';

export class Search extends Cloneable {
  public skip?: number = 0;

  public take?: number = DEFAULT_TAKE;

  public orderBy?: string;

  public orderType?: string;
}
