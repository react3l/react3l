import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class GuidFilter extends Filter {

  public static types(filter?: GuidFilter): string[] {
    return [
      nameof(filter.equalTo),
      nameof(filter.notEqualTo),
      nameof(filter.in),
      nameof(filter.notIn),
    ];
  }

  public equalTo?: string;

  public notEqualTo?: string;

  public in?: string[];

  public notIn?: string[];
}
