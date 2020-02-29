import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {ProviderType} from './ProviderType';
import {ApplicationUser} from './ApplicationUser';

export class Provider extends Model {
  public id?: number;

  public name?: string;

  public providerTypeId?: number;

  public value?: string;

  public isDefault?: boolean;

  public providerType?: ProviderType;

  public applicationUsers?: ApplicationUser[];

  public errors?: ErrorMap<Provider>;
}
