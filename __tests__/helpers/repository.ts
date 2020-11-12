import {Observable, Subscriber} from 'rxjs';
import {AxiosResponse} from 'axios';
import {responseDataMapper} from '@react3l/react3l/helpers';
import {act} from 'react-dom/test-utils';

describe('helpers:repository', () => {
  it('function:responseDataMapper', () => {
    const response: AxiosResponse = {
      config: undefined,
      headers: undefined,
      status: 0,
      statusText: '',
      data: 1,
    };

    const observable: Observable<AxiosResponse> = new Observable<AxiosResponse>(
      (subscriber: Subscriber<AxiosResponse>) => {
        subscriber.next(response);
        subscriber.complete();
      },
    );

    let result: number;

    act(() => {
      observable
        .pipe(responseDataMapper<number>())
        .subscribe((value: number) => {
          result = value;
        });
    });

    expect(result).toEqual(response.data);
  });
});
