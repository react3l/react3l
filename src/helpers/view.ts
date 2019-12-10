import {PaginationProps} from 'antd/lib/pagination';
import {Model} from 'core/models';
import {DEFAULT_TAKE} from 'core/models/Search';

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
