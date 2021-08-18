import { Engine } from '@designable/core';
import { transformToSchema, transformToTreeNode } from '@designable/formily';
import { message } from 'antd';

export const saveSchema = (designer: Engine) => {
  sessionStorage.setItem(
    'formily-schema',
    JSON.stringify(
      transformToSchema(designer.getCurrentTree(), {
        designableFieldName: 'DesignableField',
        designableFormName: 'Root',
      })
    )
  );
  message.success('Save Success');
};

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(sessionStorage.getItem('formily-schema')), {
        designableFieldName: 'DesignableField',
        designableFormName: 'Root',
      })
    );
  } catch {}
};
