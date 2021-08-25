import React, { FC } from 'react';
import { Form, FormItem } from '@formily/antd';
import { createForm } from '@formily/core';
import { ISchema } from '@formily/json-schema';
import { createSchemaField } from '@formily/react';
import { Section } from '../Section';
import { Term } from '../Term';

export interface PreviewProps {
  schema: ISchema;
}

const form = createForm({
  validateFirst: true,
});

const SchemaField = createSchemaField({
  components: {
    FormItem,

    Section,
    Term,
  },
});

export const Preview: FC<PreviewProps> = (props) => {
  const { schema } = props;

  return (
    <Form form={form} layout="vertical" size="large" onAutoSubmit={console.log}>
      <SchemaField schema={schema} />
    </Form>
  );
};
