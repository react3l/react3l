import moment from 'moment';

/**
 * Current environment is production
 *
 * @type {boolean}
 */
export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';

/**
 * Current environment is production
 *
 * @type {boolean}
 */
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';

/**
 * Initial skip value for {ModelFilter}
 *
 * @type {number}
 */
export const INITIAL_SKIP: number = 0;

/**
 * Default take value for {ModelFilter}
 *
 * @type {number}
 */
export const DEFAULT_TAKE: number = 10;

/**
 * Standard date-time without timezone expression
 *
 * @type {RegExp}
 */
export const STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE: RegExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}[\sT][0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?$/;

/**
 * Standard date-time expression
 *
 * @type {RegExp}
 */
export const STANDARD_DATE_TIME_REGEX: RegExp
  = /^([0-9]{4}-[0-9]{2}-[0-9]{2})[\sT]([0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?)(Z|[+-][0-9]{2}:[0-9]{2})?$/;

/**
 * Standard date-time format
 *
 * @type {string}
 */
export const STANDARD_DATE_TIME_FORMAT: string = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

/**
 * Standard date format
 *
 * @type {string}
 */
export const STANDARD_DATE_FORMAT: string = 'YYYY-MM-DD';

/**
 * Standard time format
 *
 * @type {string}
 */
export const STANDARD_TIME_FORMAT: string = 'HH:mm:ss';

/**
 * Timezone offset string
 *
 * @type {string}
 */
export const TIMEZONE_OFFSET: string = moment().format('Z');

export const DEBOUNCE_TIME_100: number = 100;

export const DEBOUNCE_TIME_150: number = 150;

export const DEBOUNCE_TIME_200: number = 200;

export const DEBOUNCE_TIME_250: number = 250;

export const DEBOUNCE_TIME_300: number = 300;

export const DEBOUNCE_TIME_350: number = 350;

export const DEBOUNCE_TIME_400: number = 400;

export const DEBOUNCE_TIME_450: number = 450;

export const DEBOUNCE_TIME_500: number = 500;

export const DEBOUNCE_TIME_550: number = 550;

export const DEBOUNCE_TIME_600: number = 600;

export const IMAGE_JPEG: string = 'image/jpeg';

export const IMAGE_PNG: string = 'image/png';

export const IMAGE_GIF: string = 'image/gif';
