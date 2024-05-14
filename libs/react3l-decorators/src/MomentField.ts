import { DecoratorSymbol } from './DecoratorSymbol';
import moment from 'moment';
import { BasePrototype } from './BasePrototype';

/**
 * Decorate a field with moment format
 *
 * @constructor
 */
export const MomentField = (): PropertyDecorator => {
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
              moment(value),
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
