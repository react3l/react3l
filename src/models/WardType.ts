import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Ward} from './Ward';

export class WardType extends Model {
  public id?: number;

  public code?: string;

  public wards?: Ward[];

  public errors?: ErrorMap<WardType>;
}
