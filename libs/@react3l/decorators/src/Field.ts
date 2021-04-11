import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';

/**
 * Decorate a field with primitive format: String, Number, Boolean
 *
 * @param prototype {Function}
 * @constructor
 */
export const Field = (prototype: (...params: any[]) => any): PropertyDecorator => {
  return (Target: any, property: string | symbol): void => {
    Object.defineProperty(Target, property, {
      enumerable: true,
      configurable: true,
      get() {
        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
      },
      set(value: any) {
        Object.defineProperty(this, property, {
          enumerable: true,
          configurable: false,
          get() {
            return Reflect.getMetadata(
              DecoratorSymbol.RAW_VALUE,
              this,
              property
            );
          },
          set(value: any) {
            if (value === null || value === undefined) {
              Reflect.defineMetadata(
                DecoratorSymbol.RAW_VALUE,
                value,
                this,
                property
              );
              return;
            }
            Reflect.defineMetadata(
              DecoratorSymbol.RAW_VALUE,
              prototype(value),
              this,
              property
            );
          }
        });
        this[property] = value;
      }
    });
  };
};
