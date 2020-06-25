import {Moment} from 'moment';

function getPrivateKey(propertyKey: string): string {
  return `__${propertyKey}`;
}

export function DateProperty() {
  return function (prototype: any, propertyKey: string): void {
    const privateKey: string = getPrivateKey(propertyKey);
    Object.defineProperty(prototype, privateKey, {
      enumerable: false,
      configurable: true,
      set(value: Date | Moment): void {
        Object.defineProperty(this, privateKey, {
          configurable: false,
          enumerable: false,
          writable: true,
        });
        this[privateKey] = value;
      },
    });
    Object.defineProperty(prototype, propertyKey, {
      enumerable: true,
      configurable: true,
      set(value: Moment | Date | string | null) {
        Object.defineProperty(this, propertyKey, {
          configurable: false,
          enumerable: true,
          get(): Date {
            return this[privateKey];
          },
          set(value: Moment | Date | string | null): void {
            if (typeof value === 'string') {
              this[privateKey] = new Date(value);
              return;
            }
            if (typeof value === 'object' && value !== null) {
              if ('_isAMomentObject' in value && 'toDate' in value) {
                this[privateKey] = (value as Moment).toDate();
                return;
              }
            }
            this[privateKey] = value;
            return;
          },
        })
        this[propertyKey] = value;
      },
    });
  };
}
