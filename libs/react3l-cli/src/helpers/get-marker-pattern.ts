export function getMarkedPattern(marker: string): RegExp {
  return new RegExp(`${marker}\\(['"]([a-zA-Z0-9]+((\\.[a-zA-Z0-9]+)*))['"](, ?([^)]*))?\\)`, 'gm');
}
