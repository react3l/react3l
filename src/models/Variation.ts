import {Model} from 'core';
import {Item} from 'models/Item';

import {VariationGrouping} from 'models/VariationGrouping';

export class Variation extends Model {

  public id?: number;

  public name?: string;

  public variationGroupingId?: number;

  public variationGrouping?: VariationGrouping;

  public itemFirstVariations?: Item[];

  public itemSecondVariations?: Item[];

  public constructor(variation?: Variation) {
    super(variation);
  }
}
