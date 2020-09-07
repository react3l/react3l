import {Model, RegisteredModel} from '@react3l/react3l/core';
import {Moment} from 'moment';
import {TestClass} from '@react3l/react3l/__tests__/models/TestClass';

@RegisteredModel()
export class TestUser extends Model {
  public code?: string;

  public name?: string;

  public email?: string;

  public birthday?: Moment;

  public userClassId?: number;

  public userClass?: TestClass;
}
