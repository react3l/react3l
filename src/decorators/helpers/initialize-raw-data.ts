import { rawDataSymbol } from '@react3l/react3l/decorators/config/symbols';

export function initializeRawData(target: any) {
  if (!target.hasOwnProperty(rawDataSymbol)) {
    Object.defineProperty(target, rawDataSymbol, {
      enumerable: false,
      configurable: false,
      writable: true,
      value: {},
    });
  }
}
