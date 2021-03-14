import type { Observable } from 'rxjs';
import type { AxiosResponse } from 'axios';

export type AxiosObservable<T> = Observable<AxiosResponse<T>>;
