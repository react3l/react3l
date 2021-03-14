import {Model} from '@react3l/common';
import {Field, MomentField} from '@react3l/decorators';
import type {Moment} from 'moment';
import type {Application} from './Application';

export class User extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public name?: string;

  @MomentField()
  public birthday?: Moment;

  public application?: Application;
}
