import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class GuidFilter extends Filter {
  public equalTo?: string;

  public notEqualTo?: string;

  public in?: string[];

  public notIn?: string[];

  public get types(): string[] {
    return [
      nameof(this.equalTo),
      nameof(this.notEqualTo),
      nameof(this.in),
      nameof(this.notIn),
    ];
  }
}
