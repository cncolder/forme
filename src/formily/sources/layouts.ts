import { ITreeNode } from '@designable/core';

export const layouts: ITreeNode[] = [
  {
    componentName: 'DesignableField',
    props: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'Section title',
      },
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'void',
      'x-component': 'Term',
      'x-component-props': {
        title: 'Term title',
      },
    },
  },
];
