import {Model} from 'core';

import {ImageFile} from 'models/ImageFile';
import {Product} from 'models/Product';

export class Category extends Model {

  public id?: number;

  public code?: string;

  public name?: string;

  public parentId?: number;

  public imageId?: number;

  public disabled?: boolean;

  public image?: ImageFile;

  public parent?: Category;

  public inverseParent?: Category[];

  public products?: Product[];

  public constructor(category?: Category) {
    super(category);
  }
}
