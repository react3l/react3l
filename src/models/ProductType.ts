import {Model} from 'core';

import {Product} from 'models/Product';

export class ProductType extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public products?: Product[];

  public constructor(productType?: ProductType) {
    super(productType);
  }
}
