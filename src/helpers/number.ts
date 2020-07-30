export function numberWithCommas(x: number): string {
  if (!Number.isNaN(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
}

export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !Number.isNaN(value);
}

export default {
  numberWithCommas,
  isValidNumber,
};
