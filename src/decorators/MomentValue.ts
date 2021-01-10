import type {Model} from '@react3l/react3l/core';
import {ModelSymbol} from '@react3l/react3l/symbols';
import moment from 'moment';

/**
 * Decorate a field with moment format
 *
 * @constructor
 */
export const MomentValue = () => {
  return (Target: typeof Model['prototype'], property: string | symbol) => {
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
            if (value === null || value === undefined) {
              Reflect.defineMetadata(
                ModelSymbol.rawValue,
                value,
                this,
                property,
              );
              return;
            }
            Reflect.defineMetadata(
              ModelSymbol.rawValue,
              moment(value),
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
