import { ISchema } from '@formily/json-schema';

export const defaultSchema: ISchema = {
  version: '1',
  type: 'object',
  properties: {
    A: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'A. Structural Improvements',
      },
      properties: {
        I: {
          type: 'void',
          'x-component': 'Term',
          'x-component-props': {
            title: 'I. Term',
          },
        },
        II: {
          type: 'void',
          'x-component': 'Term',
          'x-component-props': {
            title: 'II. Term',
          },
        },
      },
    },
    B: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'B. Roof',
      },
    },
    C: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'C. Appliances',
      },
    },
  },
};
