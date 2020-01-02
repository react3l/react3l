import {Model} from 'core';

import {Product} from 'models/Product';

export class Brand extends Model {

  public id?: number;

  public name?: string;

  public disabled?: boolean;

  public products?: Product[];

  public constructor(brand?: Brand) {
    super(brand);
  }
}
