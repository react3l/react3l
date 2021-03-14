import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';

/**
 * Decorate a field as a list of model relation
 *
 * @param constructor
 * @constructor
 */
export const ObjectList = (constructor?: Function): PropertyDecorator => {
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
            const InstanceConstructor = constructor ?? Target.constructor;
            const instances = value?.map((element: any) => {
              let instance;
              if (typeof InstanceConstructor.create === 'function') {
                instance = InstanceConstructor.create();
              } else {
                instance = new InstanceConstructor();
              }
              if (typeof element === 'object' && element !== null) {
                Object.assign(instance, element);
              }
              console.log(instance, element);
              return instance;
            });
            Reflect.defineMetadata(
              DecoratorSymbol.RAW_VALUE,
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
