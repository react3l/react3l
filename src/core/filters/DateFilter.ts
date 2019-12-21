import {Filter} from 'core/filters/Filter';
import nameof from 'ts-nameof.macro';

export class DateFilter extends Filter {
  public equalTo?: Date;

  public notEqualTo?: Date;

  public greaterThan?: Date;

  public greaterThanOrEqualTo?: Date;

  public lessThan?: Date;

  public lessThanOrEqualTo?: Date;

  public get types(): string[] {
    return [
      nameof(this.equalTo),
      nameof(this.notEqualTo),
      nameof(this.greaterThan),
      nameof(this.greaterThanOrEqualTo),
      nameof(this.lessThan),
      nameof(this.lessThanOrEqualTo),
    ];
  }
}
