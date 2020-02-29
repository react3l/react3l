import {Model} from 'core/models';
import {ErrorMap} from 'react3l';
import {Permission} from './Permission';

export class Page extends Model {
  public id?: number;

  public name?: string;

  public path?: string;

  public parentId?: number;

  public permissions?: Permission[];

  public errors?: ErrorMap<Page>;
}
