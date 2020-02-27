import path from 'path';

export function url(baseURL: string, ...segments: string[]) {
  return `${baseURL}/${path.join(...segments)}`;
}
