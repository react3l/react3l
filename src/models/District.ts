import {Model} from 'core/models';
import {Province} from './Province';

export class District extends Model {
  public id?: number;

  public name?: string;

  public type?: string;

  public provinceId?: number;

  public province?: Province;
}
