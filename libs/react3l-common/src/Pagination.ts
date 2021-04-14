import type { OrderType } from './OrderType';

export interface Pagination {
  skip?: number;

  take?: number;

  orderBy?: string;

  orderType?: OrderType;
}
