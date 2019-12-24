import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class IdFilter extends Filter {

  public static types(filter?: IdFilter): string[] {
    return [
      nameof(filter.equalTo),
      nameof(filter.notEqualTo),
      nameof(filter.in),
      nameof(filter.notIn),
    ];
  }

  public equalTo?: number;

  public notEqualTo?: number;

  public in?: number[];

  public notIn?: number[];
}
