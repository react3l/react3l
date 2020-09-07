import {Model} from 'react3l/core';

/**
 * @template T
 *
 * @return {Promise<T | void>}
 *
 * @throws {FormValidationErrors<T>}
 */
export type FormValidationTrigger<T extends Model> = () => Promise<T | void>;
