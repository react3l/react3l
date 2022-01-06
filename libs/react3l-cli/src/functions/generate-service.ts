import {composeNames} from '../helpers/naming';
import type {Command} from 'commander';
import path from 'path';
import {writeFileSync} from 'fs';

export function generateService(program: Command, name: string): void {
  const {
    pascalCase,
    camelCase,
    kebabCase,
  } = composeNames(`${name}-service`);
  const {dest} = program.opts();
  const dirName = path.resolve(dest === '.' ? 'src/models' : dest);

  const content = `import {Service} from 'react3l-common';

export class SampleService extends Service {
  //
}

export const sampleService: SampleService = new SampleService();
`
    .split('SampleService').join(pascalCase)
    .split('sampleService').join(camelCase);

  writeFileSync(path.join(dirName, `${kebabCase}.ts`), content);
}
