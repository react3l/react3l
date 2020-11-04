export function getEnumerableProperties(o: any): string[] {
  return Object.keys(o).filter((key: string) => {
    if (key === 'constructor') {
      return false;
    }
    const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(o, key);
    return descriptor.enumerable;
  });
}
