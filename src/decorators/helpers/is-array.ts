export function isArray(value: any, fieldName: string) {
  if (value instanceof Array) {
    return true;
  }
  throw new Error(`Value of ${fieldName} must be an array`);
}
