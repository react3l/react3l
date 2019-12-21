import {Filter} from 'core/filters/Filter';
import nameof from 'ts-nameof.macro';

export class NumberFilter extends Filter {
  public equalTo?: number;

  public notEqualTo?: number;

  public greaterThan?: number;

  public greaterThanOrEqualTo?: number;

  public lessThan?: number;

  public lessThanOrEqualTo?: number;

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
