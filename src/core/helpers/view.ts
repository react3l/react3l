import {PaginationProps} from 'antd/lib/pagination';
import {DEFAULT_TAKE} from 'core/config';
import {Model} from 'core/models';

export function renderMasterIndex<T extends Model>(pagination?: PaginationProps) {
  return (...[, , index]: [any, T, number]) => {
    if (pagination) {
      const {
        current = 1,
        pageSize = DEFAULT_TAKE,
      } = pagination;
      return index + 1 + (current - 1) * pageSize;
    }
    return index + 1;
  };
}
