import {composeNames} from '../helpers/naming';
import fs, {writeFileSync} from 'fs';
import path from 'path';
import type {Command} from 'commander';
import moment from 'moment';

export function generateComponent(program: Command, name: string): void {
  const {
    camelCase,
    pascalCase,
  } = composeNames(name);

  const {dest, scss} = program.opts();

  const dirName = path.resolve(dest, pascalCase);

  try {
    fs.mkdirSync(dirName);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Can not create directory %s', dirName);
  }

  let content = `import React from 'react';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';

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

SampleComponent.defaultProps = {
  //
};

SampleComponent.displayName = nameof(SampleComponent);

export default SampleComponent;
`
    .split('sampleComponent').join(camelCase)
    .split('SampleComponent').join(pascalCase);

  if (scss) {
    content = content.replace(
      `import React from 'react';`,
      `import React from 'react';\nimport './${pascalCase}.scss';`,
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
    writeFileSync(path.join(dirName, `${pascalCase}.scss`), scssContent);
  }
}
