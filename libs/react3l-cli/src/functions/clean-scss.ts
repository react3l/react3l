import type {ObjectEncodingOptions} from 'fs';
import fs from 'fs';
import {scssService} from '../ScssService';
import chalk from 'chalk';
import path from 'path';

const baseEncodingOptions: ObjectEncodingOptions = {
  encoding: 'utf-8',
};

export function cleanScss(entryPath: string): void {
  if (fs.existsSync(entryPath)) {
    if (fs.lstatSync(entryPath).isDirectory()) {
      fs.readdirSync(entryPath).forEach((dirName) => {
        cleanScss(path.join(entryPath, dirName));
      });
      return;
    }
    if (entryPath.matchAll(/\.tsx$/g)) {
      const entryName: string = path.basename(entryPath);
      const basePath: string = path.dirname(entryPath);
      if (entryName.match(/\.tsx?$/)) {
        const fileName: string = entryName.replace(/\.tsx$/, '');
        const scssName = `${fileName}.scss`;
        const scssPath: string = path.join(basePath, scssName);
        if (fs.existsSync(scssPath)) {
          try {
            const scssCode: string = fs
              .readFileSync(scssPath, baseEncodingOptions)
              .toString()
              .split(/;{2,}/gm)
              .join(';');
            const tsxCode: string = fs
              .readFileSync(entryPath, baseEncodingOptions)
              .toString();
            const usedClasses: Record<string,
              string> = scssService.getUsedClasses(tsxCode);
            const newScss: string = scssService.removeUnusedMixins(
              scssService.clean(scssCode, usedClasses),
            );
            fs.writeFileSync(scssPath, newScss.split(/\n{3,}/gm).join('\n\n'));
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(
              'Error occurred at file: %s',
              chalk.blueBright(scssPath),
            );
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }
      }
    }
  }
}
