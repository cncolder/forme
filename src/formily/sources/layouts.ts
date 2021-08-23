import { GlobalDragSource } from '@designable/core';

GlobalDragSource.setSourcesByGroup('layouts', [
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
]);
