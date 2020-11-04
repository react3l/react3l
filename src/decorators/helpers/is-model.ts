import { Model } from '@react3l/react3l/core/model';
import { EntityConstructor } from '@react3l/react3l/decorators/types/EntityConstructor';

export function isModel(Constructor: EntityConstructor) {
  if (Constructor.prototype instanceof Model) {
    return true;
  }
  throw new Error(`${Constructor.name} does not extend base Model class`);
}
