import {Model} from 'core/models/Model';
import {District} from './District';
import {Moment} from 'moment';

export class Province extends Model {
  public id?: number;

  public name?: string;

  public districts?: District[];

  public isActive?: boolean;

  public createdAt?: Moment;

  public updatedAt?: Moment;

  public deletedAt?: Moment;
}
