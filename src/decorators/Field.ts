import { rawDataSymbol } from '@react3l/react3l/decorators/config/symbols';
import { initializeRawData } from '@react3l/react3l/decorators/helpers/initialize-raw-data';
import { isModel } from '@react3l/react3l/decorators/helpers/is-model';
import { markAsDecoratedField } from '@react3l/react3l/decorators/helpers/mark-as-decorated-field';
import { EntityConstructor } from '@react3l/react3l/decorators/types/EntityConstructor';

export function Field(prototype: Function) {
  return (Target: EntityConstructor['prototype'], property: string) => {
    isModel(Target.constructor);

    initializeRawData(Target);

    markAsDecoratedField(Target, property);

    Object.defineProperty(Target, property, {
      enumerable: true,
      configurable: true,
      get() {
        return this[rawDataSymbol][property];
      },
      set(value: any) {
        initializeRawData(this);

        Object.defineProperty(this, property, {
          enumerable: true,
          configurable: false,
          get() {
            return this[rawDataSymbol][property];
          },
          set(value: any) {
            this[rawDataSymbol][property] = prototype(value);
          },
        });
        this[property] = value;
      },
    });
  };
}
