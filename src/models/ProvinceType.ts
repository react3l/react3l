import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Province} from './Province';

export class ProvinceType extends Model {
  public id?: number;

  public code?: string;

  public provinces?: Province[];

  public errors?: ErrorMap<ProvinceType>;
}
