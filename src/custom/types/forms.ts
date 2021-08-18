export namespace forms {
  export interface FlowConfig {
    form_id: string;
    items: Item[];
  }

  export enum ItemKind {
    SECTION,
    TERM,
    STRING,
    PAGE_BREAK,
    BOOLEAN,
    SINGLE_SELECT,
    MULTIPLE_SELECT,
    DATE,
    TIME,
  }

  export interface Item {
    num?: string;
    kind: ItemKind;
    title: string;
    description?: string;
    form_id?: string;
    field_id?: string;
  }

  export interface Section {
    annotation_id: string;
    items: Item[];
  }

  export interface Term {
    items: Item[];
  }

  export interface Boolean {
    style: 'radio' | 'checkbox' | 'buttons';
    yes: {
      label: string;
    };
    no: {
      label: string;
    };
  }
}
