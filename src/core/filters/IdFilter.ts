import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class IdFilter extends Filter {

  public equalTo?: number;

  public notEqualTo?: number;

  public in?: number[];

  public notIn?: number[];

  public get types(): string[] {
    return [
      nameof(this.equalTo),
      nameof(this.notEqualTo),
      nameof(this.in),
      nameof(this.notIn),
    ];
  }
}
