import { Model } from './Model';
import type { Pagination } from './Pagination';
import { OrderType } from './OrderType';
import { Enum, Field } from 'react3l-decorators';

export class ModelFilter extends Model implements Pagination {
  @Field(String)
  public orderBy: string;

  @Enum(OrderType)
  public orderType: OrderType;

  @Field(Number)
  public skip: number;

  @Field(Number)
  public take: number;
}
