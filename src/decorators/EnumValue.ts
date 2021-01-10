import 'reflect-metadata';
import {ModelSymbol} from '@react3l/react3l/symbols';

/**
 * Decorate a field as enum value
 *
 * @param enumObject
 * @constructor
 */
export const EnumValue = (enumObject: object) => {
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
            if (value === null || value === undefined) {
              Reflect.defineMetadata(
                ModelSymbol.rawValue,
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
            Reflect.defineMetadata(ModelSymbol.rawValue, value, this, property);
          },
        });
        this[property] = value;
      },
    });
  };
};
