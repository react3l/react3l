import {Search} from 'core/models';
import {DistrictType} from 'models/DistrictType';

export class DistrictSearch extends Search {
  public id?: number;

  public name?: string;

  public provinceId?: number;

  public districtTypeId?: number;

  public districtType?: DistrictType;
}
