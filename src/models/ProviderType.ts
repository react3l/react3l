import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Provider} from './Provider';

export class ProviderType extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public providers?: Provider[];

  public errors?: ErrorMap<ProviderType>;
}
