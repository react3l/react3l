export function numberWithCommas(x: number): string {
  if (!Number.isNaN(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
}

export default {
  numberWithCommas,
};
