import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Provider} from './Provider';
import {UserStatus} from './UserStatus';
import {Role} from './Role';

export class ApplicationUser extends Model {
  public id?: number;

  public username?: string;

  public password?: string;

  public displayName?: string;

  public email?: string;

  public phone?: string;

  public userStatusId?: number;

  public retryTime?: number;

  public providerId?: number;

  public provider?: Provider;

  public userStatus?: UserStatus;

  public roles?: Role[];

  public errors?: ErrorMap<ApplicationUser>;
}
