export interface Extractor {
  /**
   * Input directory, translation will be extracted from here
   *
   * @type {string}
   */
  input?: string;

  /**
   * Output directory, translation will be extracted to here
   */
  output?: string;

  /**
   * Translation marker, appearance in code
   *
   * @type {string} - marker
   */
  marker?: string;

  /**
   * Comma-separated language list
   *
   * @type {string[]}
   */
  languages?: string[];

  /**
   * Partial directory
   *
   * @type {string}
   */
  partials?: string;

  /**
   * Indent size in translation files
   *
   * @type {string}
   */
  indentSize?: string;

  /**
   * Source files include-pattern
   *
   * @type {string}
   */
  include?: string;

  /**
   * Source files exclude-pattern
   *
   * @type {string}
   */
  exclude?: string;

  /**
   * Translation key separator
   *
   * @type {string}
   */
  keySeparator?: string;
}
