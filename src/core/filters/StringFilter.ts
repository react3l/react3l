import nameof from 'ts-nameof.macro';
import {Filter} from './Filter';

export class StringFilter extends Filter {
  public startsWith?: string;

  public endsWith?: string;

  public equalTo?: string;

  public notEqualTo?: string;

  public contains?: string;

  public notContains?: string;

  public get types(): string[] {
    return [
      nameof(this.startsWith),
      nameof(this.endsWith),
      nameof(this.equalTo),
      nameof(this.notEqualTo),
      nameof(this.contains),
      nameof(this.notContains),
    ];
  }
}
