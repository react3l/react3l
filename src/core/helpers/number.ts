export function isValidNumbers(...numbers: Array<number | undefined | null>) {
  let result: boolean = true;
  numbers.forEach((x: number | undefined | null) => {
    result = result && typeof x === 'number' && !Number.isNaN(x);
  });
  return result;
}
