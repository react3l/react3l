import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Permission} from './Permission';

export class PermissionData extends Model {
  public id?: number;

  public permissionId?: number;

  public filterName?: string;

  public filterType?: string;

  public filterValue?: string;

  public permission?: Permission;

  public errors?: ErrorMap<PermissionData>;
}
