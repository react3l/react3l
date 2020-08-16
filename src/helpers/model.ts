/**
 * Extract a unique key from a model
 *
 * @param {T} model
 * @return {string}
 */
export function keyExtractor<T>(model: T) {
  return `${(model as any).id}`;
}

export default {
  keyExtractor,
};
