import {Model} from 'core';

/**
 * @template T
 *
 * @return {Promise<T | void>}
 *
 * @throws {FormValidationErrors<T>}
 */
export type FormValidationTrigger<T extends Model> = () => Promise<T | void>;
