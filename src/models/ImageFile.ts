import {Model} from 'core';

import {Category} from 'models/Category';
import {Coupon} from 'models/Coupon';

export class ImageFile extends Model {

  public id?: number;

  public key?: string;

  public name?: string;

  public url?: string;

  public thumbUrl?: string;

  public originUrl?: string;

  public categories?: Category[];

  public coupons?: Coupon[];

  public constructor(imageFile?: ImageFile) {
    super(imageFile);
  }
}
