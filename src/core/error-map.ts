import {Model} from 'core/model';

export type ErrorMap<T extends Model> = Record<keyof T, string>;
