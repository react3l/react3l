import {composeNames} from '../helpers/naming';
import {writeFileSync} from 'fs';
import path from 'path';
import type {Command} from 'commander';
import {execSync} from 'child_process';
import moment from 'moment';

export function generateComponent(program: Command, name: string): void {
  const {
    kebabCase,
    camelCase,
    pascalCase,
  } = composeNames(name);

  const {dest, scss} = program.opts();

  const dirName = path.resolve(dest, kebabCase);


  execSync(`mkdir -p ${dirName}`);

  let content = `import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';

export function SampleComponent(props: PropsWithChildren<SampleComponentProps>): ReactElement {
  const {children} = props;

  return (
    <>
      {children}
    </>
  );
}

export interface SampleComponentProps {
  //
}

export default SampleComponent;
`
    .split('sampleComponent').join(camelCase)
    .split('SampleComponent').join(pascalCase);

  if (scss) {
    content = content.replace(
      `import React from 'react';`,
      `import React from 'react';\nimport './${kebabCase}.scss';`,
    );
  }

  writeFileSync(path.join(dirName, 'index.tsx'), content);
  if (scss) {
    const scssContent = `/**
 * SampleComponent
 * YYYY-MM-DD HH:mm:ss
 */
`
      .split('YYYY-MM-DD HH:mm:ss').join(moment().format('YYYY-MM-DD HH:mm:ss'))
      .split('SampleComponent').join(pascalCase);
    writeFileSync(path.join(dirName, `${kebabCase}.scss`), scssContent);
  }
}
