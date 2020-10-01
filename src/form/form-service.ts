import { Model } from '@react3l/react3l/core';
import { FormAction } from '@react3l/react3l/form/types/form-action';
import { FormResponse } from '@react3l/react3l/form/types/form-response';
import { FormState } from '@react3l/react3l/form/types/form-state';
import { FormValidationErrors } from '@react3l/react3l/form/types/form-validation-errors';
import { useForm } from '@react3l/react3l/form/use-form';
import { FormFieldHTMLChangeHandler, FormFieldPureChangeHandler, useFormField } from '@react3l/react3l/form/use-form-field';
import { useValidation } from '@react3l/react3l/form/use-validation';
import { validate } from '@react3l/react3l/form/validate';
import { Dispatch } from 'react';
import { ObjectSchema, Schema } from 'yup';

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
    FormFieldHTMLChangeHandler,
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
