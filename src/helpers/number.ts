/**
 * Format a number with thousand-separator
 *
 * @param {number} x
 * @return {string}
 */
export function numberWithCommas(x: number): string {
  if (!Number.isNaN(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
}

/**
 * Check if a value is a valid number
 *
 * @param value
 * @return {boolean}
 */
export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !Number.isNaN(value);
}

export default {
  numberWithCommas,
  isValidNumber,
};
