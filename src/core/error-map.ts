import {Model} from 'core/model';

/**
 * ErrorMap for Model
 */
export type ErrorMap<T extends Model> = Record<Exclude<keyof T, 'errors'>, string>;
