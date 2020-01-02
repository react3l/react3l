import nameof from 'ts-nameof.macro';
import {Filter} from '../filters/Filter';

export class NumberFilter extends Filter {

  public equal?: number;

  public notEqual?: number;

  public greater?: number;

  public greaterEqual?: number;

  public less?: number;

  public lessEqual?: number;

  public static types(): string[] {
    const filter: NumberFilter = new NumberFilter();
    return [
      nameof(filter.equal),
      nameof(filter.notEqual),
      nameof(filter.greater),
      nameof(filter.greaterEqual),
      nameof(filter.less),
      nameof(filter.lessEqual),
    ];
  }
}
