export class Filter {

  constructor(filter?: Filter) {
    if (!!filter) {
      Object.assign(this, filter);
    }
  }

  public get type(): string {
    let type: string = null;
    Object
      .entries(this)
      .forEach(([key, value]) => {
        if (typeof value !== 'undefined' && value !== null) {
          type = key;
        }
      });
    return type;
  }

  public get value(): string | number {
    return this[this.type];
  }

  public static types(filter?: Filter): string[] {
    return Object.keys(filter);
  }
}
