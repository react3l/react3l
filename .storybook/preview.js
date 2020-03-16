import {addDecorator} from '@storybook/react';
import Card from "antd/lib/card";
import React from 'react';
import '../src/styles';

addDecorator((storyFn) => (
  <Card>
    {storyFn()}
  </Card>
));
