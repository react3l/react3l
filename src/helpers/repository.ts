import {AxiosResponse} from 'axios';
import {map} from 'rxjs/operators';
import {OperatorFunction} from 'rxjs';

export function responseDataMapper<T>(): OperatorFunction<AxiosResponse<T>, T> {
  return map((response: AxiosResponse<T>) => response.data);
}
