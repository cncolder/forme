import { GlobalRegistry } from '@designable/core';
import { enUS } from './en-US';

export const registerDesignerLocales = () =>
  GlobalRegistry.registerDesignerLocales({
    ...enUS,
  });
