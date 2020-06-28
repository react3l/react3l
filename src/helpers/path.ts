import path from 'path';

/**
 * Concat HTTP URL
 *
 * @param baseURL
 * @param urls
 */
export function url(baseURL: string, ...urls: string[]) {
  return `${baseURL}/${path.join(...urls)}`;
}

export default {
  url,
};
