import {Model} from './Model';
import {FieldName, OrderType} from '@react3l/react3l/types';
import {PrimitiveValue} from '@react3l/react3l/decorators/PrimitiveValue';
import {EnumValue} from '@react3l/react3l/decorators/EnumValue';

export class ModelFilter<T extends Model = Model> extends Model {
  @PrimitiveValue(Number)
  public skip: number;

  @PrimitiveValue(Number)
  public take: number;

  @PrimitiveValue(String)
  public orderBy?: FieldName<T>;

  @EnumValue(String)
  public orderType?: OrderType;

  constructor(partial?: Partial<ModelFilter<T>>) {
    super();
    if (typeof partial === 'object' && partial !== null) {
      Object.assign(this, partial);
    }
  }
}
