import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class ListFilter extends Filter {

  public static types(filter?: ListFilter): string[] {
    return [
      nameof(filter.equalTo),
    ];
  }

  public equalTo: number;
}
