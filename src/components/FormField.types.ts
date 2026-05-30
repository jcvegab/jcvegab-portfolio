export type FormFieldInputType = 'checkbox' | 'select' | 'textarea' | 'default';

export type FormFieldI = {
  input_type: FormFieldInputType;
  name: string;
  default_value?: string;
  options?: string[];
  is_required?: boolean;
  label?: string;
};

export type FormFieldProps = {
  field: FormFieldI;
};
