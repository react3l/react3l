import {Model} from 'react3l-common';
import {Field} from 'react3l-decorators';

export class SampleModel extends Model {
  @Field(Number)
  public id: number;
}
