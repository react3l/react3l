import 'reflect-metadata';
import {Model} from '@react3l/react3l/core';
import {ModelSymbol} from '@react3l/react3l/symbols';

/**
 * Mark a model class as registered in model map
 *
 * @param name {string}
 * @constructor
 */
export const Entity = (name?: string) => {
  return (Target: typeof Model) => {
    const registeredName: string = name ?? Target.name;
    Reflect.defineMetadata(ModelSymbol.modelName, registeredName, Target);
    Model.registerModel(registeredName, Target);
  };
};
