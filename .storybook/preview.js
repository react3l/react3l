import {addDecorator} from '@storybook/react';
import Card from "antd/lib/card";
import React from 'react';
import './styles';

addDecorator((storyFn) => (
  <Card>
    {storyFn()}
  </Card>
));
