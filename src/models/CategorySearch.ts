import {Search} from 'core/models/Search';

export class CategorySearch extends Search {

  public id?: number;

  public code?: string;

  public name?: string;

  public parentId?: number;

  public imageId?: number;

  public disabled?: boolean;

}
