import {Model} from 'core/models';
import {District} from 'models/District';

export class DistrictType extends Model {
  public id?: number;

  public name?: string;

  public districts?: District[];
}
