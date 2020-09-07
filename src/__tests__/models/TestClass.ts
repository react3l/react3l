import {Model, RegisteredModel} from '@react3l/react3l/core';

@RegisteredModel()
export class TestClass extends Model {
  public id?: number;

  public code?: string;

  public name?: string;
}
