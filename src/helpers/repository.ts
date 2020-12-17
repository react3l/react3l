import {AxiosResponse} from 'axios';
import {map} from 'rxjs/operators';
import {OperatorFunction} from 'rxjs';
import {Model} from '@react3l/react3l/core';

export function responseDataMapper<T>(): OperatorFunction<AxiosResponse<T>, T> {
  return map((response: AxiosResponse<T>) => response.data);
}

export function responseMapToModel<T extends Model>(ModelClass: typeof Model) {
  return map((response: AxiosResponse<T>) => {
    const instance: T = ModelClass.create();
    Object.assign(instance, response.data);
    return instance;
  });
}

export function responseMapToList<T extends Model>(ModelClass: typeof Model) {
  return map((response: AxiosResponse<T[]>) => {
    return response.data?.map((data: T) => {
      const instance: T = ModelClass.create();
      Object.assign(instance, data);
      return instance;
    });
  });
}
