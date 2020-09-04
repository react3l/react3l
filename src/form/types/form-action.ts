import {Model} from 'core';
import {FormActionType} from 'form/types/form-action-type';
import {ObjectSchema} from 'yup';

export interface FormAction<T extends Model> {
  type: FormActionType;

  values?: T;

  fieldName?: keyof T;

  fieldValue?: T[this['fieldName']];

  validationSchema?: ObjectSchema<T>;
}
