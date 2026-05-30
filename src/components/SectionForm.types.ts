import type { FormFieldI } from './FormField.types';

export type SectionFormData = {
  section_id: string;
  title: string;
  subtitle: string;
  content: string;
  form_id: string;
  form_action: string;
  form_fields: FormFieldI[];
  submit_label: string;
};

export type SectionFormProps = {
  section: SectionFormData;
};
