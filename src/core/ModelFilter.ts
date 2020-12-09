import {Model} from './Model';
import {FieldName, OrderType} from '@react3l/react3l/types';
import {PrimitiveValue} from '@react3l/react3l/decorators/PrimitiveValue';
import {EnumValue} from '@react3l/react3l/decorators/EnumValue';
import {
  MODEL_FILTER_DEFAULT_SKIP,
  MODEL_FILTER_DEFAULT_TAKE,
} from '@react3l/react3l/config';

export class ModelFilter<T extends Model = Model> extends Model {
  @PrimitiveValue(Number)
  public skip: number = MODEL_FILTER_DEFAULT_SKIP;

  @PrimitiveValue(Number)
  public take: number = MODEL_FILTER_DEFAULT_TAKE;

  @PrimitiveValue(String)
  public orderBy?: FieldName<T>;

  @EnumValue(String)
  public orderType?: OrderType;
}
