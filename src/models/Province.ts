import {Model} from 'core/models';
import {District} from './District';

export class Province extends Model {
  public id?: number;

  public name?: string;

  public type?: string;

  public districts?: District[];

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(province?: Province) {
    super(province);
  }
}
