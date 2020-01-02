import nameof from 'ts-nameof.macro';
import {Filter} from '../filters/Filter';

export class DateFilter extends Filter {

  public static types(): string[] {
    const filter: DateFilter = new DateFilter();
    return [
      nameof(filter.equal),
      nameof(filter.notEqual),
      nameof(filter.greater),
      nameof(filter.greaterEqual),
      nameof(filter.less),
      nameof(filter.lessEqual),
    ];
  }

  public equal?: Date;

  public notEqual?: Date;

  public greater?: Date;

  public greaterEqual?: Date;

  public less?: Date;

  public lessEqual?: Date;
}
