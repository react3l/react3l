import {storiesOf} from '@storybook/react';
import NumberRange from 'components/NumberRange/NumberRange';
import React from 'react';

storiesOf('NumberRange', module)
  .add('Default', () => (
    <NumberRange/>
  ));
