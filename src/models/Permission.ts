import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Role} from './Role';
import {PermissionData} from './PermissionData';
import {Page} from './Page';

export class Permission extends Model {
  public id?: number;

  public name?: string;

  public roleId?: number;

  public role?: Role;

  public permissionDatas?: PermissionData[];

  public pages?: Page[];

  public errors?: ErrorMap<Permission>;
}
