export interface CommonField {
  id: string;
  type: string;
  widget: string;
  title?: string;
  question?: string;
  description?: string;
  help?: string;
  sectionId?: string;
}

export interface TextInputField extends CommonField {
  label?: string;
}

export interface TextAreaField extends CommonField {
  label?: string;
}

export type Field = TextInputField | TextAreaField;
