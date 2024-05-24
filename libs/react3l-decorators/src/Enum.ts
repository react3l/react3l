import 'reflect-metadata';
import { DecoratorSymbol } from './DecoratorSymbol';

/**
 * Decorate a field as enum value
 *
 * @param enumObject
 * @constructor
 */
export const Enum = (
  enumObject: Record<string, string | number | boolean>,
): PropertyDecorator => {
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
            if (value === null || value === undefined) {
              Reflect.defineMetadata(
                DecoratorSymbol.RAW_VALUE,
                value,
                this,
                property,
              );
              return;
            }
            const values: any[] = Object.values(enumObject);
            if (!values.includes(value)) {
              throw new Error(
                `Value ${value} is not a member of enum { ${values.join(
                  ', ',
                )} }`,
              );
            }
            Reflect.defineMetadata(
              DecoratorSymbol.RAW_VALUE,
              value,
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
