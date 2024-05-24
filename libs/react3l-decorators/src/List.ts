import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';
import { BasePrototype } from './BasePrototype';

/**
 * Decorate a field as a list of primitive values
 *
 * @param prototype {Function}
 * @constructor
 */
export const List = (
  prototype: (...params: any[]) => any,
): PropertyDecorator => {
  return (Target: any, property: string | symbol): void => {
    const basePrototype = BasePrototype.getOrCreate(Target.constructor);

    const descriptor: PropertyDescriptor = {
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
              property,
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
              property,
            );
          },
        });
        (this as any)[property] = value;
      },
    };

    Object.defineProperty(Target, property, descriptor);
    basePrototype.setPropertyDescriptor(property, descriptor);
  };
};
