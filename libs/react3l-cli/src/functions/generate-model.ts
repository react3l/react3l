import {composeNames} from '../helpers/naming';
import type {Command} from 'commander';
import path from 'path';
import {writeFileSync} from 'fs';

export function generateModel(program: Command, name: string): void {
  const {
    pascalCase,
  } = composeNames(name);
  const {dest} = program.opts();
  const dirName = path.resolve(dest === '.' ? 'src/models' : dest);

  const content = `import {Model} from 'react3l-common';
import {Field} from 'react3l-decorators';

export class SampleModel extends Model {
  @Field(Number)
  public id: number;
}
`
    .split('SampleModel').join(pascalCase);

  writeFileSync(path.join(dirName, `${pascalCase}.ts`), content);
}
