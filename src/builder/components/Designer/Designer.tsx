import React, { FC, createElement } from 'react';
import { ISchema } from '@formily/json-schema';
import { debug } from '../../utils';
import { SectionDesigner, TermDesigner } from '../designers';

export interface DesignerProps {
  schema: ISchema;
  onChange(schema: ISchema): void;
}

const log = debug(import.meta.url);

const designers = {
  SectionDesigner,
  TermDesigner,
};

const SchemaFragment: FC = ({ children }) => {
  return <>{children}</>;
};

const renderSchema = (schema: ISchema, key = '') => {
  const { 'x-component': component, properties = {} } = schema;
  const Component = designers[`${component}Designer`] || SchemaFragment;

  return createElement(
    Component,
    { key, schema },
    Object.entries(properties).map(([key, schema]) => renderSchema(schema, key))
  );
};

export const Designer: FC<DesignerProps> = (props) => {
  log('render %o', props);

  const { schema } = props;

  return <div>{renderSchema(schema)}</div>;
};
