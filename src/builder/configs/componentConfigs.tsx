import React, { ReactNode } from 'react';
import { ISchema } from '@formily/json-schema';
import { Avatar } from 'antd';
import * as icons from '../assets/icons';

export interface ComponentConfig {
  key?: string;
  name: string;
  dragable?: boolean;
  icon: ReactNode;
  schema: ISchema;
}

export const componentConfigs: Record<string, ComponentConfig> = {
  Section: {
    name: 'Section',
    dragable: true,
    icon: <Avatar src={icons.Section} size={40} />,
    schema: {
      type: 'string',
      'x-component': 'Section',
      'x-component-props': {},
    },
  },

  Term: {
    name: 'Term',
    dragable: true,
    icon: <Avatar src={icons.Term} size={40} />,
    schema: {
      type: 'string',
      'x-component': 'Term',
      'x-component-props': {},
    },
  },

  ShortAnswer: {
    name: 'Short answer',
    dragable: true,
    icon: icons.ShortAnswer,
    schema: {
      type: 'string',
      title: 'Short answer',
      'x-component': 'ShortAnswer',
      'x-component-props': {},
    },
  },

  LongAnswer: {
    name: 'Long answer',
    dragable: true,
    icon: icons.LongAnswer,
    schema: {
      type: 'string',
      title: 'Long answer',
      'x-component': 'LongAnswer',
      'x-component-props': {},
    },
  },
};
