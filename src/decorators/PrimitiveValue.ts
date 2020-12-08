import 'reflect-metadata';
import {ModelSymbol} from '@react3l/react3l/symbols';

export const PrimitiveValue = (prototype: Function) => {
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
              prototype(value),
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
