import {Model} from 'core/models/Model';
import {Province} from './Province';
import {Moment} from 'moment';

export class District extends Model {
  public id?: number;

  public name?: string;

  public provinceId?: number;

  public province?: Province;

  public createdAt?: Moment;

  public updatedAt?: Moment;

  public deletedAt?: Moment;
}
