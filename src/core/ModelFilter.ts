import {Model} from './Model';

export class ModelFilter<T extends Model = Model> extends Model {
  public skip: number;

  public take: number;

  public orderBy?: Exclude<keyof T, 'errors' | 'key'>;

  public orderType?: 'ASC' | 'DESC';

  constructor(partial?: Partial<ModelFilter<T>>) {
    super();
    if (typeof partial === 'object' && partial !== null) {
      Object.assign(this, partial);
    }
  }
}
