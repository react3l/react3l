import {Model} from 'core/model';

/**
 * ErrorMap for Model
 *
 * @param T {Model}
 */
export type ErrorMap<T extends Model> = Record<Exclude<keyof T, 'errors'>, string>;
