import {Model} from 'core/models/Model';
import {District} from './District';
import moment, {Moment} from 'moment';
import {PureModelData} from 'react3l';

export class Province extends Model {
  public id?: number;

  public name?: string;

  public provinceTypeId?: number;

  public districts?: District[];

  public createdAt?: Moment;

  public updatedAt?: Moment;

  constructor(province?: PureModelData<Province>) {
    super();
    if (typeof province === 'object' && province !== null) {
      Object.assign(this, {
        ...province,
        date: moment(province.date),
      });
    }
  }
}
