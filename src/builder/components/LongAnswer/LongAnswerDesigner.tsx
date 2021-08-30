import React from 'react';
import { ISchema } from '@formily/json-schema';
import { observer } from '@formily/react';
import { Divider, Typography } from 'antd';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { ComponentConfig } from '../../configs';
import { debug, uid } from '../../utils';
import styles from './LongAnswerDesigner.module.less';

interface LongAnswerDesignerComponentProps {
  title: string;
}

export interface LongAnswerDesignerProps {
  className?: string;
  schema: ISchema<any, any, any, LongAnswerDesignerComponentProps>;
}

const log = debug(import.meta.url);

export const LongAnswerDesigner = observer<LongAnswerDesignerProps, {}>((props) => {
  log('render %o', props);

  const { className, children, schema } = props;
  const { title } = schema['x-component-props'] as LongAnswerDesignerComponentProps;

  return <div className={classNames(styles.longAnswerDesigner, className)}>{schema.title}</div>;
});
