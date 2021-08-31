import { ISchema } from '@formily/json-schema';
import * as icons from '../assets/icons';

export interface BuilderConfig {
  key?: string;
  name: string;
  dragable?: boolean;
  icon: string;
  schema: ISchema;
}

export const builderConfigs: Record<string, BuilderConfig> = {
  Section: {
    name: 'Section',
    dragable: true,
    icon: icons.Section,
    schema: {
      type: 'string',
      'x-component': 'Section',
      'x-component-props': {},
    },
  },

  Term: {
    name: 'Term',
    dragable: true,
    icon: icons.Term,
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
