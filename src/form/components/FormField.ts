export interface FormFieldProps {
  onFocus(): () => void;

  onBlur(): () => void;

  onChange(): () => void;

  fieldName: string;
}

/**
 *
 * @deprecated FormField is deprecated.
 */
export function FormField(props: FormFieldProps): null {
  return null;
}
