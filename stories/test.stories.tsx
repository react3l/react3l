import React from 'react';
import {Model} from '@react3l/react3l/core';
import {ClassValue, PrimitiveValue} from '../src/decorators';
import {Moment} from 'moment';
import {MomentValue} from '../src/decorators/MomentValue';

export default {
  title: 'Decorators',
};

class TestModel extends Model {
  @PrimitiveValue(Number)
  public id?: number;

  @PrimitiveValue(String)
  public code?: string;

  @MomentValue()
  public birthday?: Moment;

  @ClassValue()
  public children?: TestModel;
}

export function Field() {
  React.useEffect(() => {
    const test: TestModel = TestModel.create();
    Object.assign(test, {
      id: '1',
      code: 123,
      birthday: '1997-11-01T00:00:00+0700',
      children: {
        id: 2,
      },
    });
  }, []);

  return <></>;
}
