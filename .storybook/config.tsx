import {addDecorator, configure} from '@storybook/react';
import React from 'react';
import 'antd/dist/antd.min.css';

addDecorator((storyFn) => {
  return (
    <div className="container-fluid">
      {storyFn()}
    </div>
  );
});

configure((require as any).context('../src', true, /\.stories\.tsx?$/), module);
