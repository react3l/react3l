export function match(str: string, include?: RegExp, exclude?: RegExp): boolean {
  if (include) {
    if (include.test(str)) {
      return exclude ? !exclude.test(str) : true;
    }
    return false;
  }
  return true;
}
