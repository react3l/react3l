import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class IdFilter extends Filter {

  public static types(): string[] {
    const filter: IdFilter = new IdFilter();
    return [
      nameof(filter.equal),
      nameof(filter.notEqual),
      nameof(filter.in),
      nameof(filter.notIn),
    ];
  }

  public equal?: number;

  public notEqual?: number;

  public in?: number[];

  public notIn?: number[];
}
