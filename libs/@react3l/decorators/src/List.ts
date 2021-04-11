import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';

/**
 * Decorate a field as a list of primitive values
 *
 * @param prototype {Function}
 * @constructor
 */
export const List = (prototype: (...params: any[]) => any): PropertyDecorator => {
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
            const instances = value?.map((element: any) => {
              if (element === null || element === undefined) {
                return element;
              }
              return prototype(element);
            });
            Reflect.defineMetadata(
              DecoratorSymbol.RAW_VALUE,
              instances,
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
