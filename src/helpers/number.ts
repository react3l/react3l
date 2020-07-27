export function numberWithCommas(x: number): string {
  if (!Number.isNaN(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
}

export function isValidNumber(v: any): boolean {
  return typeof v === 'number' && !Number.isNaN(v);
}

export default {
  numberWithCommas,
  isValidNumber,
};
