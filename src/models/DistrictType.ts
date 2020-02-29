import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {District} from './District';

export class DistrictType extends Model {
  public id?: number;

  public code?: string;

  public districts?: District[];

  public errors?: ErrorMap<DistrictType>;
}
