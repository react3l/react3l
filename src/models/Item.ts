import {Model} from 'core';
import {Cart} from 'models/Cart';
import {CollectionContent} from 'models/CollectionContent';
import {DiscountContent} from 'models/DiscountContent';
import {ItemHistory} from 'models/ItemHistory';
import {OrderContent} from 'models/OrderContent';

import {Product} from 'models/Product';

export class Item extends Model {

  public id?: number;

  public productId?: number;

  public firstVariation?: string;

  public secondVariation?: string;

  public sKU?: string;

  public price?: number;

  public minPrice?: number;

  public quantity?: number;

  public disabled?: boolean;

  public product?: Product;

  public carts?: Cart[];

  public collectionContents?: CollectionContent[];

  public discountContents?: DiscountContent[];

  public itemHistories?: ItemHistory[];

  public orderContents?: OrderContent[];

  public constructor(item?: Item) {
    super(item);
  }
}
