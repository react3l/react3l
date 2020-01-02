import {Model} from 'core';

import {Product} from 'models/Product';

export class ProductStatus extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public products?: Product[];

  public constructor(productStatus?: ProductStatus) {
    super(productStatus);
  }
}
