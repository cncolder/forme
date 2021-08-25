import React, { ReactNode } from 'react';
import { ISchema } from '@formily/json-schema';
import * as icons from '../assets/icons';

export interface ComponentConfig {
  key?: string;
  name: string;
  dragable?: boolean;
  icon: ReactNode;
  schema: ISchema;
}

export const componentConfigs: Record<string, ComponentConfig> = {
  ShortAnswer: {
    name: 'Short answer',
    dragable: true,
    icon: icons.ShortAnswer,
    schema: {},
  },

  LongAnswer: {
    name: 'Long answer',
    dragable: true,
    icon: icons.LongAnswer,
    schema: {},
  },
};
