import {Filter} from 'core/filters/Filter';
import nameof from 'ts-nameof.macro';

export class NumberFilter extends Filter {

  public static types(filter?: NumberFilter): string[] {
    return [
      nameof(filter.equalTo),
      nameof(filter.notEqualTo),
      nameof(filter.greaterThan),
      nameof(filter.greaterThanOrEqualTo),
      nameof(filter.lessThan),
      nameof(filter.lessThanOrEqualTo),
    ];
  }

  public equalTo?: number;

  public notEqualTo?: number;

  public greaterThan?: number;

  public greaterThanOrEqualTo?: number;

  public lessThan?: number;

  public lessThanOrEqualTo?: number;
}
