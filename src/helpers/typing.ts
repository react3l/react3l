export class Typing {
  public static isNumber(value?: number): boolean {
    return typeof value === 'number';
  }

  public static isFunction(fn?: (...params: any[]) => any): boolean {
    return typeof fn === 'function';
  }

  public static isString(value?: string): boolean {
    return typeof value === 'string';
  }

  public static isObject(value?: object): boolean {
    return typeof value === 'object' && value !== null;
  }

  public static isArray(value?: any[]): boolean {
    return typeof value === 'object' && value instanceof Array;
  }
}
