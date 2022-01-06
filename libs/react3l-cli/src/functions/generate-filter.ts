import {composeNames} from '../helpers/naming';
import type {Command} from 'commander';
import path from 'path';
import {writeFileSync} from 'fs';

export function generateFilter(program: Command, name: string): void {
  const {
    pascalCase,
  } = composeNames(`${name}-filter`);
  const {dest} = program.opts();
  const dirName = path.resolve(dest === '.' ? 'src/models' : dest);

  const content = `import {ModelFilter} from 'react3l-common';
import {IdFilter} from 'react3l-advanced-filters';

export class SampleFilter extends ModelFilter {
  public idFilter: IdFilter = new IdFilter();
}
`
    .split('SampleFilter').join(pascalCase);

  writeFileSync(path.join(dirName, `${pascalCase}.ts`), content);
}
