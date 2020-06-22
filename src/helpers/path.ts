import path from 'path';

export function url(baseURL: string, ...urls: string[]) {
  return `${baseURL}/${path.join(...urls)}`;
}
