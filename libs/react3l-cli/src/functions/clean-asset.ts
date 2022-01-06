import type {Command} from 'commander';
import path from 'path';
import {getFileList} from '../helpers/get-file-list';
import fs from 'fs';

function unlink(file: string) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

export function cleanAsset(program: Command): void {
  const {asset, source} = program.opts();

  const assetPath: string = path.resolve(process.cwd(), asset);
  const sourcePath: string = path.resolve(process.cwd(), source);

  const assetDirname: string = path.dirname(assetPath);

  const assetList = getFileList(assetPath).map((entry: string) =>
    entry.replace(`${assetDirname}/`, '')
  );

  const srcList = getFileList(sourcePath).filter((entry: string) =>
    entry.match(/\.tsx?$/)
  );

  const hasBeenUsedMap: Record<string, boolean> = Object.fromEntries(
    assetList.map((assetFile: string) => [assetFile, false])
  );

  srcList.forEach((srcFile: string) => {
    const content = fs.readFileSync(srcFile, {
      encoding: 'utf-8',
    });
    assetList.forEach((assetFile: string) => {
      if (content.indexOf(assetFile) > -1) {
        hasBeenUsedMap[assetFile] = true;
      }
    });
  });

  const unusedFiles = Object.entries(hasBeenUsedMap)
    .filter(([, used]) => !used)
    .filter(([filename]) => !filename.match(/fonts/))
    .map(([filename]) => filename);

  unusedFiles.forEach((file) => {
    if (file.match(/@(2x|3x)/)) {
      const original = file.replace(/@(2x|3x)/, '');
      if (!hasBeenUsedMap[original]) {
        unlink(path.join(assetDirname, file));
        unlink(path.join(assetDirname, original));
      }
      return;
    }
    if (!hasBeenUsedMap[file]) {
      unlink(path.join(assetDirname, file));
    }
  });
}
