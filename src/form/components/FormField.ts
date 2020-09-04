export interface FormFieldProps {
  onFocus(): () => void;

  onBlur(): () => void;

  onChange(): () => void;

  fieldName: string;
}

export function FormField(props: FormFieldProps): null {
  return null;
}
