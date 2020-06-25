import {Model} from 'core/model';

export type ErrorMap<T extends Model> = Record<Exclude<keyof T, 'errors'>, string>;
