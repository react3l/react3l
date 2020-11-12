import 'reflect-metadata';
import {ModelSymbol} from '@react3l/react3l/symbols/ModelSymbol';

export class Model {
  public static Field(prototype: Function): PropertyDecorator {
    return (Target: Object, property: string | symbol) => {
      const protoMap: Record<string, Function> =
        Reflect.getOwnMetadata(ModelSymbol.proto, Target) ?? {};
      Reflect.defineMetadata(
        ModelSymbol.proto,
        {
          ...protoMap,
          [property]: prototype,
        },
        Target,
      );
    };
  }

  public static Entity() {
    return (Target: any) => {
      const protoMap: Record<string, Function> =
        Reflect.getOwnMetadata(ModelSymbol.proto, Target.prototype) ?? {};
      Object.entries(protoMap).forEach(([property, prototype]) => {
        Object.defineProperty(Target.prototype, property, {
          enumerable: true,
          configurable: false,
          get() {
            return Reflect.getMetadata(property, this);
          },
          set(value: any) {
            Reflect.defineMetadata(
              property,
              value === null || value === undefined ? value : prototype(value),
              this,
            );
          },
        });
      });
    };
  }
}
