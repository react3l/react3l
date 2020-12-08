import 'reflect-metadata';
import {ModelSymbol} from '@react3l/react3l/symbols';
import {Model} from '@react3l/react3l/core';

export const ClassList = (constructor?: typeof Model) => {
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
            const instances = value?.map((element: any) => {
              const instance = (constructor ?? Target.constructor).create();
              if (typeof element === 'object' && element !== null) {
                Object.assign(instance, element);
              }
              return instance;
            });
            Reflect.defineMetadata(
              ModelSymbol.rawValue,
              instances,
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
