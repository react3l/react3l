import 'reflect-metadata';
import {Model} from 'core/model';

const registeredModels: Record<string, any> = {}

/**
 * Add a model to a registered list
 *
 * @param name string
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
  }
}

export function getModel(name: string) {
  return registeredModels[name];
}

export function getAllModels() {
  return registeredModels;
}
