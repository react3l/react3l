import { Model } from '@react3l/react3l/core/model';
import { entityDerivedClassSymbol, entityParentClassSymbol } from '@react3l/react3l/decorators/config/symbols';
import { initializeRawData } from '@react3l/react3l/decorators/helpers/initialize-raw-data';
import { isModel } from '@react3l/react3l/decorators/helpers/is-model';
import { EntityConstructor } from '@react3l/react3l/decorators/types/EntityConstructor';
import 'reflect-metadata';

export function Entity() {
  return (Target: EntityConstructor) => {
    isModel(Target);

    initializeRawData(Target.prototype);

    const DerivedClass: EntityConstructor = class extends Model {
      constructor(partial?: Record<keyof typeof Target, any>) {
        super(partial);

        initializeRawData(this);

        if (partial) {
          Object.keys(this)
            .forEach((key: string) => {
              if (partial?.hasOwnProperty(key)) {
                this[key] = (partial as any)[key];
              }
            });
        }
      }
    };

    initializeRawData(DerivedClass.prototype);

    Object.defineProperty(DerivedClass, 'name', {
      value: Target.name,
    });

    Reflect.defineMetadata(entityDerivedClassSymbol, DerivedClass, Target);
    Reflect.defineMetadata(entityParentClassSymbol, Target, DerivedClass);

    const GrantParentPrototype: EntityConstructor['prototype'] = Object.getPrototypeOf(Target).prototype;
    if (GrantParentPrototype instanceof Model) {
      Object.entries(Object.getOwnPropertyDescriptors(GrantParentPrototype)).forEach(([key, descriptor]) => {
        if (key !== 'constructor' && descriptor.enumerable) {
          Object.defineProperty(DerivedClass.prototype, key, descriptor);
        }
      });
    }

    Object.entries(Object.getOwnPropertyDescriptors(Target.prototype)).forEach(([key, descriptor]) => {
      if (key !== 'constructor') {
        Object.defineProperty(DerivedClass.prototype, key, descriptor);
      }
    });

    return DerivedClass;
  };
}
