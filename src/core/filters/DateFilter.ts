import {Moment} from 'moment';
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
      nameof(filter.range),
    ];
  }

  public equal?: Moment;

  public notEqual?: Moment;

  public greater?: Moment;

  public greaterEqual?: Moment;

  public less?: Moment;

  public lessEqual?: Moment;

  public range?: [Moment | null | undefined, Moment | null | undefined];
}
