import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';
import { BasePrototype } from './BasePrototype';

/**
 * Decorate a field with primitive format: String, Number, Boolean
 *
 * @param prototype {Function}
 * @constructor
 */
export const Field = (
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
            if (value === null || value === undefined) {
              Reflect.defineMetadata(
                DecoratorSymbol.RAW_VALUE,
                value,
                this,
                property,
              );
              return;
            }
            Reflect.defineMetadata(
              DecoratorSymbol.RAW_VALUE,
              prototype(value),
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
