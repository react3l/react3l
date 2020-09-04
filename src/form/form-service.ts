import {useForm} from 'form/use-form';
import {FormFieldHTMLChangeHandler, FormFieldPureChangeHandler, useFormField} from 'form/use-form-field';
import {Model} from 'core';
import {ObjectSchema, Schema} from 'yup';
import {FormState} from 'form/types/form-state';
import {Dispatch} from 'react';
import {FormAction} from 'form/types/form-action';
import {FormResponse} from 'form/types/form-response';
import {useValidation} from 'form/use-validation';
import {validate} from 'form/validate';
import {FormValidationErrors} from 'form/types/form-validation-errors';

export type HandlerType = 'web' | 'native';

export interface FormService {
  useForm<T extends Model>(
    ModelClass: new () => T,
    initialValue?: T,
    validationSchema?: ObjectSchema<T>,
  ): FormResponse<T>;

  useFormField<T extends Model, P extends keyof T>(
    form: FormState<T>,
    dispatch: Dispatch<FormAction<T>>,
    fieldName: P,
  ): [
    T[P],
    FormFieldPureChangeHandler<T, P>,
  ];

  useFormField<T extends Model, P extends keyof T, HT = 'web'>(
    form: FormState<T>,
    dispatch: Dispatch<FormAction<T>>,
    fieldName: P,
  ): [
    T[P],
    FormFieldHTMLChangeHandler<T, P>,
  ];

  useValidation<T>(initialValue: Schema<T>): Schema<T>;

  /**
   * Validate a form
   *
   * @template T
   * @param form {T}
   * @throws {FormValidationErrors<T>}
   */
  validate<T extends Model>(form: FormState<T>): Promise<T>;

  hasError<T extends Model>(form: FormState<T>, errors: FormValidationErrors<T>, field: keyof T): boolean;

  getErrorMessage<T extends Model>(form: FormState<T>, errors: FormValidationErrors<T>, field: keyof T): string;

  getErrorState<T extends Model>(form: FormState<T>, errors: FormValidationErrors<T>, field: keyof T): 'error' | undefined;
}

export const formService: FormService = {
  useForm,
  useFormField,
  useValidation,
  validate,
  hasError<T extends Model>(form: FormState<T>, errors: FormValidationErrors<T>, field: keyof T): boolean {
    return form.touched[field] && errors?.hasOwnProperty(field) && !!errors[field];
  },
  getErrorState<T extends Model>(form: FormState<T>, errors: FormValidationErrors<T>, field: keyof T): 'error' | undefined {
    return this.hasError<T>(form, errors, field) ? 'error' : undefined;
  },
  getErrorMessage<T extends Model>(form: FormState<T>, errors: FormValidationErrors<T>, field: keyof T): string {
    return this.hasError<T>(form, errors, field) ? errors[field] as string : undefined;
  },
};
