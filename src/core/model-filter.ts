import {DEFAULT_TAKE, INITIAL_SKIP} from 'config/consts';
import {OrderType} from 'core/order-type';

export class ModelFilter {
  public skip: number = INITIAL_SKIP;

  public take: number = DEFAULT_TAKE;

  public orderBy?: keyof this;

  public orderType?: OrderType;

  public static clone<T extends ModelFilter>(ModelFilterClass: new () => T, tFilter?: Partial<T>) {
    return {
      ...new ModelFilterClass(),
      ...(tFilter ?? {}),
    };
  }
}
