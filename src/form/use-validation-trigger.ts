import React, {Reducer} from 'react';
import {Model} from 'core';
import {FormState} from 'form/types/form-state';
import {FormValidationErrors} from 'form/types/form-validation-errors';
import {DEBOUNCE_TIME_100} from 'config';
import {Subject} from 'rxjs';
import {FormValidationTrigger} from 'form/types/form-validation-trigger';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {commonService} from 'services/common-service';
import {Schema} from 'yup';

enum FormValidationErrorActionType {
  patch,
  delete,
}

interface FormValidationErrorAction<T extends Model> {
  type: FormValidationErrorActionType,

  fieldName: keyof T;

  fieldValue?: string;
}

function errorReducer<T extends Model>(state: FormValidationErrors<T>, action: FormValidationErrorAction<T>) {
  switch (action.type) {
    case FormValidationErrorActionType.patch:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };

    case FormValidationErrorActionType.delete:
      return {
        ...state,
        [action.fieldName]: undefined,
      };

    default:
      return state;
  }
}

/**
 * Validate a form
 *
 * @template T
 * @param form {T}
 * @throws {FormValidationErrors<T>}
 */
export function useValidationTrigger<T extends Model>(
  form: FormState<T>,
): [
  FormValidationErrors<T>,
] {
  const [errors, dispatchErrors] = React.useReducer<Reducer<FormValidationErrors<T>, FormValidationErrorAction<T>>>(errorReducer, {});

  const subject: Subject<FormValidationTrigger<T>> = React.useRef<Subject<FormValidationTrigger<T>>>(
    new Subject<FormValidationTrigger<T>>(),
  ).current;

  const [subscription] = commonService.useSubscription();

  React.useEffect(
    () => {
      subscription.add(
        subject
          .pipe(
            debounceTime(DEBOUNCE_TIME_100),
            distinctUntilChanged(),
          )
          .subscribe(async (validationTrigger) => {
            await validationTrigger();
          }),
      );
    },
    [subject, subscription],
  );

  React.useEffect(
    () => {
      subject.next(
        async (): Promise<T | void> => {
          if (form.validationSchema?.fields) {
            await Promise.all(
              Object.entries(form.validationSchema?.fields)
                .map(async <P extends keyof T>([key, validationSchema]: [P, Schema<T[P]>]) => {
                  await validationSchema.validate(form.values[key])
                    .then(() => {
                      dispatchErrors({
                        type: FormValidationErrorActionType.delete,
                        fieldName: key,
                      });
                    })
                    .catch((error) => {
                      dispatchErrors({
                        type: FormValidationErrorActionType.patch,
                        fieldName: key,
                        fieldValue: error.message,
                      });
                    });
                }),
            );
          }
        },
      );
    },
    [form, subject],
  );

  return [
    errors,
  ];
}
