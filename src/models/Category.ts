import {Model} from 'core/models';
import {ErrorMap, PureModelData} from 'core/types';
import {Brand} from './Brand';
import {ImageFile} from './ImageFile';

export class Category extends Model {

  public static clone<T extends Model = Category>(category?: PureModelData<Category>): T | null {
    const instance: T = new Model() as T;
    if (typeof category !== 'undefined' && category !== null) {
      Object.assign(instance, {
        ...category,

        image: ImageFile.clone<ImageFile>(category.image),

      });
      return instance;
    }
    return null;
  }

  public id?: number;

  public name?: string;

  public slug?: string;

  public pathId?: string;

  public level?: number;

  public parentId?: number;

  public imageId?: number;

  public disabled?: boolean;

  public title?: string;

  public description?: string;

  public image?: ImageFile;

  public brands?: Brand[];

  public errors?: ErrorMap<Category>;
}
