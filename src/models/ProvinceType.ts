import {Model} from 'core/models';
import {Province} from 'models/Province';

export class ProvinceType extends Model {
  public id?: number;

  public name?: string;

  public provinces?: Province;
}
