import {Filter} from 'core/filters/Filter';
import nameof from 'ts-nameof.macro';

export class DateFilter extends Filter {

  public static types(filter?: DateFilter): string[] {
    return [
      nameof(filter.equalTo),
      nameof(filter.notEqualTo),
      nameof(filter.greaterThan),
      nameof(filter.greaterThanOrEqualTo),
      nameof(filter.lessThan),
      nameof(filter.lessThanOrEqualTo),
    ];
  }

  public equalTo?: Date;

  public notEqualTo?: Date;

  public greaterThan?: Date;

  public greaterThanOrEqualTo?: Date;

  public lessThan?: Date;

  public lessThanOrEqualTo?: Date;
}
