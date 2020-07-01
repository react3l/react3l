/**
 * Filter constants
 */
import moment from 'moment';

export const INITIAL_SKIP: number = 0;

export const DEFAULT_TAKE: number = 10;

/**
 * Date-time constants
 */

export const STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE: RegExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}[\sT][0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?$/;

export const STANDARD_DATE_TIME_REGEX: RegExp
  = /^([0-9]{4}-[0-9]{2}-[0-9]{2})[\sT]([0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?)(Z|[+-][0-9]{2}:[0-9]{2})?$/;

export const STANDARD_DATE_TIME_FORMAT: string = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

export const STANDARD_DATE_FORMAT: string = 'YYYY-MM-DD';

export const STANDARD_TIME_FORMAT: string = 'HH:mm:ss';

export const TIMEZONE_OFFSET: string = moment().format('Z');

/**
 * Debounce time constants
 */

export const DEBOUNCE_TIME_100: number = 100;

export const DEBOUNCE_TIME_150: number = 150;

export const DEBOUNCE_TIME_200: number = 200;

export const DEBOUNCE_TIME_250: number = 250;

export const DEBOUNCE_TIME_300: number = 300;

export const DEBOUNCE_TIME_350: number = 350;

export const DEBOUNCE_TIME_400: number = 400;

/**
 * Image Mime Types
 */

export const IMAGE_JPEG: string = 'image/jpeg';

export const IMAGE_PNG: string = 'image/png';

export const IMAGE_GIF: string = 'image/gif';
