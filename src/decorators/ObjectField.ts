import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';

/**
 * Decorate a field as a model relation
 *
 * @param constructor
 * @constructor
 */
export const ObjectField = (constructor?: Function): PropertyDecorator => {
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
              property,
            );
          },
          set(value: any) {
            if (
              value === null ||
              value === undefined ||
              value instanceof Target.constructor
            ) {
              Reflect.defineMetadata(
                DecoratorSymbol.RAW_VALUE,
                value,
                this,
                property,
              );
              return;
            }
            let instance;
            const InstanceConstructor = constructor ?? Target.constructor;
            if (typeof InstanceConstructor.create === 'function') {
              instance = InstanceConstructor.create();
            } else {
              instance = new InstanceConstructor();
            }
            Object.assign(instance, value);
            Reflect.defineMetadata(
              DecoratorSymbol.RAW_VALUE,
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
