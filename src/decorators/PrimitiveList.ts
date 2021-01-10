import 'reflect-metadata';
import {ModelSymbol} from '@react3l/react3l/symbols';

/**
 * Decorate a field as a list of primitive values
 *
 * @param prototype {Function}
 * @constructor
 */
export const PrimitiveList = (prototype: Function) => {
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
              if (element === null || element === undefined) {
                return element;
              }
              return prototype(element);
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
