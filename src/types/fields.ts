export interface CommonField {
  id: string;
  type: string;
  widget: string;
  question?: string;
  description?: string;
  help?: string;
}

export interface TextInputField extends CommonField {
  label?: string;
}

export interface TextAreaField extends CommonField {
  label?: string;
}

export type Field = TextInputField | TextAreaField;
