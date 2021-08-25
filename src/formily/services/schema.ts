import { Engine } from '@designable/core';
import {
  transformToSchema,
  transformToTreeNode,
  ITransformerOptions,
  IFormilySchema,
} from '@designable/formily';

const storageKey = 'formly_schema';
const transformerOptions: ITransformerOptions = {
  designableFieldName: 'DesignableField',
  designableFormName: 'Root',
};

export const saveSchema = (designer: Engine) => {
  const schema = transformToSchema(designer.getCurrentTree(), transformerOptions);
  sessionStorage.setItem(storageKey, JSON.stringify(schema));
};

export const loadInitialSchema = (designer: Engine) => {
  try {
    const schema: IFormilySchema = JSON.parse(sessionStorage.getItem(storageKey));
    designer.setCurrentTree(transformToTreeNode(schema, transformerOptions));
  } catch {
    const schema: IFormilySchema = {
      form: {
        labelCol: 6,
        wrapperCol: 12,
      },
      schema: {
        type: 'object',
        properties: {
          A: {
            type: 'void',
            'x-component': 'Section',
            'x-component-props': {
              title: 'A',
            },
            'x-index': 0,
          },
          B: {
            type: 'void',
            'x-component': 'Section',
            'x-component-props': {
              title: 'B',
            },
            'x-index': 1,
          },
          C: {
            type: 'void',
            'x-component': 'Section',
            'x-component-props': {
              title: 'C',
            },
            'x-index': 2,
          },
        },
      },
    };
    designer.setCurrentTree(transformToTreeNode(schema, transformerOptions));
  }
};
