import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class StringFilter extends Filter {

  public startWith?: string;

  public notStartWith?: string;

  public endWith?: string;

  public notEndWith?: string;

  public equal?: string;

  public notEqual?: string;

  public contain?: string;

  public notContain?: string;

  public static types(): string[] {
    const filter: StringFilter = new StringFilter();
    return [
      nameof(filter.startWith),
      nameof(filter.notStartWith),
      nameof(filter.endWith),
      nameof(filter.notEndWith),
      nameof(filter.equal),
      nameof(filter.notEqual),
      nameof(filter.contain),
      nameof(filter.notContain),
    ];
  }
}
