import {Model} from '@react3l/common';
import {Field} from '@react3l/decorators';
import type {User} from './User';

export class Application extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public code?: string;

  @Field(String)
  public name?: string;

  public users?: User[];
}
