import {Model} from 'core';

export class Administrator extends Model {

  public id?: number;

  public username?: string;

  public displayName?: string;

  public picture?: string;

  public constructor(administrator?: Administrator) {
    super(administrator);
  }
}
