import { entityDerivedClassSymbol, rawDataSymbol } from '@react3l/react3l/decorators/config/symbols';
import { getEnumerableProperties } from '@react3l/react3l/decorators/helpers/get-enumerable-properties';
import { initializeRawData } from '@react3l/react3l/decorators/helpers/initialize-raw-data';
import { isModel } from '@react3l/react3l/decorators/helpers/is-model';
import { markAsDecoratedField } from '@react3l/react3l/decorators/helpers/mark-as-decorated-field';
import { EntityConstructor } from '@react3l/react3l/decorators/types/EntityConstructor';
import { TypeChecking } from '@react3l/react3l/helpers';
import 'reflect-metadata';

export function Relation(RelationType: EntityConstructor) {
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
            const RelationClass: EntityConstructor = Reflect.getMetadata(entityDerivedClassSymbol, RelationType) ?? RelationType;

            if (value instanceof RelationClass) {
              this[rawDataSymbol][property] = value;
              return;
            }

            this[rawDataSymbol][property] = new RelationClass();

            if (TypeChecking.isObject(value)) {
              getEnumerableProperties(Target).forEach((key: string) => {
                this[rawDataSymbol][key] = value[key];
              });
            }
          },
        });

        this[property] = value;
      },
    });
  };
}
