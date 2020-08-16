import 'reflect-metadata';
import {Model} from 'core/model';

/**
 * Store all registered models
 *
 * @type {Record<string, Model>}
 */
const registeredModels: Record<string, Model> = {};

/**
 * Add a model to a registered list
 *
 * @param name {string}
 * @constructor
 */
export function RegisteredModel<T extends Model>(name?: string) {
  return function (ModelClass: typeof Model) {
    if (new ModelClass() instanceof Model) {
      const modelName: string = name ?? ModelClass.name;
      registeredModels[modelName] = ModelClass;
      return ModelClass;
    }
    throw new Error(`Class ${ModelClass.name} does not extend the base Model class`);
  };
}

/**
 * Get a model by name
 * @param name {string}
 *
 * @return {Model}
 */
export function getModel(name: string) {
  return registeredModels[name];
}

/**
 * Get all registered models
 */
export function getAllModels(): Record<string, Model> {
  return registeredModels;
}
