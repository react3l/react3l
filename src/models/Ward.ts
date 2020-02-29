import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {WardType} from './WardType';

export class Ward extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public wardTypeId?: number;

  public districtId?: number;

  public wardType?: WardType;

  public errors?: ErrorMap<Ward>;
}
