export function keyExtractor<T>(model: T) {
  return `${(model as any).id}`;
}

export default {
  keyExtractor,
};
