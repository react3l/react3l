import {Model} from 'core/models';
import {ErrorMap} from 'react3l';

export class Site extends Model {
  public id?: number;

  public name?: string;

  public uRL?: string;

  public status?: number;

  public errors?: ErrorMap<Site>;
}
