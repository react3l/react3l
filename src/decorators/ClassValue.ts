import 'reflect-metadata';
import {ModelSymbol} from '@react3l/react3l/symbols';
import type {Model} from '@react3l/react3l/core';

/**
 * Decorate a field as a model relation
 *
 * @param constructor
 * @constructor
 */
export const ClassValue = (constructor?: typeof Model) => {
  return (Target: any, property: string | symbol) => {
    Object.defineProperty(Target, property, {
      enumerable: true,
      configurable: true,
      get() {
        return Reflect.getMetadata(ModelSymbol.rawValue, this, property);
      },
      set(value: any) {
        Object.defineProperty(this, property, {
          enumerable: true,
          configurable: false,
          get() {
            return Reflect.getMetadata(ModelSymbol.rawValue, this, property);
          },
          set(value: any) {
            if (
              value === null ||
              value === undefined ||
              value instanceof Target.constructor
            ) {
              Reflect.defineMetadata(
                ModelSymbol.rawValue,
                value,
                this,
                property,
              );
              return;
            }
            const instance = (constructor ?? Target.constructor).create();
            Object.assign(instance, value);
            Reflect.defineMetadata(
              ModelSymbol.rawValue,
              instance,
              this,
              property,
            );
          },
        });
        this[property] = value;
      },
    });
  };
};
