import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {ApplicationUser} from './ApplicationUser';

export class UserStatus extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public applicationUsers?: ApplicationUser[];

  public errors?: ErrorMap<UserStatus>;
}
