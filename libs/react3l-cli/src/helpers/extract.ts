import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import kebabCase from 'lodash/kebabCase';
import {join, resolve} from 'path';
import {defaultLanguages, ENCODING} from '../config/consts';
import {getMarkedPattern} from '../helpers/get-marker-pattern';
import type {Command} from 'commander';
import type {Extractor} from '../Extractor';
import {getFileList} from './get-file-list';

export function extract(program: Command): void {
  const {
    input,
    marker,
    languages = defaultLanguages,
    partials,
    keySeparator,
    indentSize,
  } = program.opts<Extractor>();

  const include = new RegExp(program.opts().include);
  const exclude = new RegExp(program.opts().exclude);

  let keys: Record<string, string> = {};
  let namespaces: Record<string, string> = {};

  getFileList(input, include, exclude)
    .forEach((file: string) => {
      const content: string = readFileSync(file, ENCODING);
      const pattern: RegExp = getMarkedPattern(marker);
      const matches: RegExpMatchArray = content.match(pattern);
      if (matches !== null) {
        matches
          .forEach((match: string) => {
            const key: string = match.replace(getMarkedPattern(marker), '$1');
            const namespace: string = key.split(keySeparator)[0];
            if (!Object.prototype.hasOwnProperty.call(keys, key)) {
              keys = {
                ...keys,
                [key]: '',
              };
            }
            if (!Object.prototype.hasOwnProperty.call(namespaces, namespace)) {
              namespaces = {
                ...namespaces,
                [namespace]: kebabCase(namespace),
              };
            }
          });
      }
    });
  languages
    .forEach((language: string) => {
      try {
        mkdirSync(join(partials, language));
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.info('Directory existed, no need to create new');
      }
      Object
        .entries(namespaces)
        .forEach(([namespace, kebabizedNamespace]) => {
          const filePath: string = resolve(partials, language, `${kebabizedNamespace}.json`);
          if (existsSync(filePath)) {
            try {
              const existedKeys: Record<string, string> = JSON.parse(readFileSync(filePath, 'utf-8'));
              Object
                .entries(existedKeys)
                .forEach(([key, value]) => {
                  if (Object.prototype.hasOwnProperty.call(keys, key)) {
                    keys = {
                      ...keys,
                      [key]: value,
                    };
                  }
                });
            } catch (error) {
              // tslint:disable-next-line:no-console
              console.error('Can not read file %s', filePath);
            }
          }
          let updatedKeys: { [key: string]: any } = {};
          Object
            .keys(keys)
            .forEach((key: string) => {
              if (key.startsWith(`${namespace}.`)) {
                updatedKeys = {
                  ...updatedKeys,
                  [key]: keys[key],
                };
              }
            });
          writeFileSync(filePath, JSON.stringify(updatedKeys, null, Number(indentSize)));
          // tslint:disable-next-line:no-console
          console.info('Write %d keys to file %s', Object.keys(updatedKeys).length, filePath);
        });
    });
}
