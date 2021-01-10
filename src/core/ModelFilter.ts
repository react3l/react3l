import {EnumValue} from '@react3l/react3l/decorators/EnumValue';
import {PrimitiveValue} from '@react3l/react3l/decorators/PrimitiveValue';
import type {AppDTO, OrderType} from '@react3l/react3l/types';
import {Model} from './Model';

export class ModelFilter<T extends Model = Model> extends Model {
  @PrimitiveValue(Number)
  public skip: number = 0;

  @PrimitiveValue(Number)
  public take: number = 10;

  @PrimitiveValue(String)
  public orderBy?: AppDTO.FieldName<T>;

  @EnumValue(String)
  public orderType?: OrderType;
}
