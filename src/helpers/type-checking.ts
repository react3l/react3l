/**
 * Type checking helper
 */
export class TypeChecking {
  /**
   * Check if a value is a number
   *
   * @param {number} value
   * @return {boolean}
   */
  public static isNumber(value?: number): boolean {
    return typeof value === 'number';
  }

  /**
   * Check if a variable is a function
   *
   * @param {(...params: any[]) => any} fn
   * @return {boolean}
   */
  public static isFunction(fn?: (...params: any[]) => any): boolean {
    return typeof fn === 'function';
  }

  /**
   * Check if a value is a string
   *
   * @param {string} value
   * @return {boolean}
   */
  public static isString(value?: string): boolean {
    return typeof value === 'string';
  }

  /**
   * Check if a value is an object
   *
   * @param {object} value
   * @return {boolean}
   */
  public static isObject(value?: object): boolean {
    return typeof value === 'object' && value !== null;
  }

  /**
   * Check if a value is an array
   *
   * @param {any[]} value
   * @return {boolean}
   */
  public static isArray(value?: any[]): boolean {
    return typeof value === 'object' && value instanceof Array;
  }
}
