import {Model} from 'core/models/Model';
import {Province} from './Province';

export class District extends Model {
  public id?: number;

  public name?: string;

  public districtTypeId?: number;

  public province?: Province;
}
