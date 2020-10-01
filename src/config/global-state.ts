/**
 * Common global state interface
 * @deprecated This is no longer needed. Each project should define its own global state class
 */
export interface GlobalState {
  /**
   * App language
   *
   * @type {string}
   */
  language?: string;
}
