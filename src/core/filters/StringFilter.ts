import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class StringFilter extends Filter {

  public static types(filter?: StringFilter): string[] {
    return [
      nameof(filter.startsWith),
      nameof(filter.endsWith),
      nameof(filter.equalTo),
      nameof(filter.notEqualTo),
      nameof(filter.contains),
      nameof(filter.notContains),
    ];
  }

  public startsWith?: string;

  public endsWith?: string;

  public equalTo?: string;

  public notEqualTo?: string;

  public contains?: string;

  public notContains?: string;
}
