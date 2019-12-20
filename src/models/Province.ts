import {Model} from 'core/models';
import {ProvinceType} from 'models/ProvinceType';
import {District} from './District';

export class Province extends Model {
  public id?: number;

  public name?: string;

  public provinceType?: ProvinceType;

  public provinceTypeId?: number;

  public districts?: District[];
}
