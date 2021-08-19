import { Engine } from '@designable/core';
import { transformToSchema, transformToTreeNode, ITransformerOptions } from '@designable/formily';

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
    const schema = JSON.parse(sessionStorage.getItem(storageKey));
    designer.setCurrentTree(transformToTreeNode(schema, transformerOptions));
  } catch {}
};
