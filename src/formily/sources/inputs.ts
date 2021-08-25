import { ITreeNode } from '@designable/core';

export const inputs: ITreeNode[] = [
  {
    componentName: 'DesignableField',
    props: {
      title: 'Input',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      title: 'Short answer',
      type: 'object',
      'x-component': 'ShortAnswer',
      properties: {
        question: {
          type: 'void',
          'x-component': 'Text',
          'x-component-props': {
            mode: 'h3',
            content: 'Question',
          },
        },
        description: {
          type: 'void',
          'x-component': 'Text',
          'x-component-props': {
            content: 'Description',
          },
        },
        value: {
          title: 'Short answer',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      title: 'Long answer',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'LongAnswer',
    },
  },
];
