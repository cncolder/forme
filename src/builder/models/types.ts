import { ReactNode } from 'react';
import { ISchema } from '@formily/json-schema';

export interface ComponentConfig {
  dragable?: boolean;
  icon: ReactNode;
  schema: ISchema;
}
