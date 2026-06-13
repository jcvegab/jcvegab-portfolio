import type { FormFieldItem } from './FormField.types';

export type SectionFormItem = {
  section_id: string;
  title: string;
  subtitle: string;
  content: string;
  form_id: string;
  form_action: string;
  form_fields: FormFieldItem[];
  submit_label: string;
};
