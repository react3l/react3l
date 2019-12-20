import {Search} from 'core/models';
import {ProvinceType} from 'models/ProvinceType';

export class ProvinceSearch extends Search {
  public id?: number;

  public name?: string;

  public provinceTypeId?: number;

  public provinceType?: ProvinceType;
}
