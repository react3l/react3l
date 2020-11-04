import { isDecoratedFieldSymbol } from '@react3l/react3l/decorators/config/symbols';
import 'reflect-metadata';

export function markAsDecoratedField(Target: Object, property: string | symbol) {
  Reflect.defineMetadata(isDecoratedFieldSymbol, true, Target, property);
}
