import React from 'reactn';
import RichTextEditor from 'components/RichTextEditor/RichTextEditor';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';

export const title: string = 'RichTextEditor';

function Default() {
  return (
    <RichTextEditor/>
  );
}

storiesOf('RichTextEditor', module)
  .add(nameof(Default), Default);
