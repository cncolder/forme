import React, { useMemo } from 'react';
import { TreeNode } from '@designable/core';
import { transformToSchema } from '@designable/formily';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Card, Slider, Rate, Button } from 'antd';
import { Section, Term, ShortAnswer, LongAnswer } from '../components';
import { DesignableField } from '../designable/DesignableField';

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,

    Text: DesignableField,

    Section,
    Term,
    ShortAnswer,
    LongAnswer,
  },
});

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree, {
    designableFormName: 'Root',
    designableFieldName: 'DesignableField',
  });

  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => form.submit((values) => console.log('form submit', values))}
      >
        Submit
      </Button>
    </Form>
  );
};
