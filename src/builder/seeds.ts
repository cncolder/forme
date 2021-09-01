import { ISchema } from '@formily/json-schema';

export const defaultSchema: ISchema = {
  version: '1',
  type: 'object',
  properties: {
    aaaaaa: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'A. Structural Improvements',
      },
      properties: {
        aaa001: {
          type: 'void',
          'x-component': 'Term',
          'x-component-props': {
            title: 'I. Term',
          },
        },
        aaa002: {
          type: 'void',
          'x-component': 'Term',
          'x-component-props': {
            title: 'II. Term',
          },
        },
      },
    },
    bbbbbb: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'B. Roof',
      },
    },
    cccccc: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'C. Appliances',
      },
    },
  },
};
