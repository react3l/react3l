import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Permission} from './Permission';
import {ApplicationUser} from './ApplicationUser';

export class Role extends Model {
  public id?: number;

  public name?: string;

  public permissions?: Permission[];

  public applicationUsers?: ApplicationUser[];

  public errors?: ErrorMap<Role>;
}
