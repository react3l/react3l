import { lstatSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { match } from './match';

export function getFileList(path: string, include?: RegExp, exclude?: RegExp): string[] {
  let files: string[] = [];
  readdirSync(path)
    .forEach((entry: string) => {
      const entryPath: string = resolve(path, entry);
      if (lstatSync(entryPath).isDirectory()) {
        files = [
          ...files,
          ...getFileList(entryPath, include, exclude),
        ];
      } else {
        if (match(entryPath, include, exclude)) {
          files = [
            ...files,
            entryPath,
          ];
        }
      }
    });
  return files;
}
