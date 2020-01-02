import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class GuidFilter extends Filter {

  public static types(): string[] {
    const filter: GuidFilter = new GuidFilter();
    return [
      nameof(filter.equal),
      nameof(filter.notEqual),
      nameof(filter.in),
      nameof(filter.notIn),
    ];
  }

  public equal?: string;

  public notEqual?: string;

  public in?: string[];

  public notIn?: string[];
}
