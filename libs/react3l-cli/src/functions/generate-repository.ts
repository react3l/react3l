import {composeNames} from '../helpers/naming';
import type {Command} from 'commander';
import path from 'path';
import {writeFileSync} from 'fs';
import {execSync} from 'child_process';

export function generateRepository(program: Command, name: string): void {
  const {
    pascalCase,
    kebabCase,
  } = composeNames(`${name}-repository`);
  const {dest} = program.opts();

  const dirName = path.resolve(dest === '.' ? 'src/repositories' : dest);

  try {
    execSync(`mkdir -p ${dirName}`);
  } catch {
    //
  }

  const content = `import {Repository} from 'react3l-common';

export class SampleRepository extends Repository {
  constructor() {
    super();
    this.baseURL = '<BASE_URL>';
  }
}

export const sampleRepository: SampleRepository = new SampleRepository();
`
    .split('SampleRepository').join(pascalCase);

  writeFileSync(path.join(dirName, `${kebabCase}.ts`), content);
}
