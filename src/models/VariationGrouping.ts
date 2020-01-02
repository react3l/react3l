import {Model} from 'core';

import {Product} from 'models/Product';

export class VariationGrouping extends Model {

  public id?: number;

  public name?: string;

  public productId?: number;

  public disabled?: boolean;

  public variations?: string;

  public product?: Product;

  public constructor(variationGrouping?: VariationGrouping) {
    super(variationGrouping);
  }
}
