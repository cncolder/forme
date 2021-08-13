import React, { FC } from 'react';
import FR, { FRProps } from 'form-render';

import * as widgets from '../../widgets';

export * from 'form-render';

export interface FormRenderProps extends FRProps {}

export const FormRender: FC<FormRenderProps> = (props) => {
  return <FR widgets={widgets} {...props} />;
};
