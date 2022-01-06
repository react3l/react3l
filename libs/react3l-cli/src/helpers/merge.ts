import {readFileSync, writeFileSync} from 'fs';
import {join, resolve} from 'path';
import {defaultLanguages, ENCODING} from '../config/consts';
import {getFileList} from './get-file-list';
import type {Command} from 'commander';
import type {Extractor} from '../Extractor';

export function merge(program: Command): void {
  let results: Record<string, Record<string, string>> = {};

  const {languages = defaultLanguages, partials, output, indentSize} = program.opts<Extractor>();

  languages
    .forEach((language: string) => {
      getFileList(join(partials, language))
        .forEach((file: string) => {
          if (!Object.prototype.hasOwnProperty.call(results, language)) {
            results = {
              ...results,
              [language]: {},
            };
          }
          const loadedKeys: { [key: string]: string } = JSON.parse(readFileSync(file, {
            encoding: ENCODING,
          }));
          results[language] = {
            ...results[language],
            ...loadedKeys,
          };
          console.info('Loaded file %s', file);
        });
    });

  Object
    .entries(results)
    .forEach(([language, translations]) => {
      const outputFile: string = resolve(output, `${language}.json`);
      writeFileSync(outputFile, JSON.stringify(translations, null, Number(indentSize)));
      console.info('Language file %s updated', outputFile);
    });
}
