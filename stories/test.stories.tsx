import React from 'react';
import {Model} from '@react3l/react3l/core';

@Model.Entity()
class TestModel extends Model {
  @Model.Field(Number)
  public id: number;

  @Model.Field(String)
  public name: string;
}

console.log(TestModel.create());

export default {
  title: 'Decorators',
};

export function Field() {
  return <></>;
}
