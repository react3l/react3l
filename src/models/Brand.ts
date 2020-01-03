import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Category} from './Category';
import {ImageFile} from './ImageFile';

export class Brand extends Model {

  public static clone<T extends Model = Brand>(brand?: PureModelData<Brand>): T | null {
    const instance: T = new Model() as T;
    if (typeof brand !== 'undefined' && brand !== null) {
      Object.assign(instance, {
        ...brand,

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public name?: string;

  public slug?: string;

  public disabled?: boolean;

  public title?: string;

  public description?: string;

  public categories?: Category[];

  public imageFiles?: ImageFile[];

  public errors?: ErrorMap<Brand>;
}
