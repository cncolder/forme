import React from 'react';
import { ISchema } from '@formily/json-schema';
import { observer } from '@formily/react';
import { Form, Input } from 'antd';
import classNames from 'classnames';
import { ComponentConfig } from '../../configs';
import { debug } from '../../utils';
import styles from './ShortAnswerDesigner.module.less';

interface ShortAnswerDesignerComponentProps {
  title: string;
  question?: string;
  description?: string;
}

export interface ShortAnswerDesignerProps {
  className?: string;
  schema: ISchema<any, any, any, ShortAnswerDesignerComponentProps>;
}

const log = debug(import.meta.url);

export const ShortAnswerDesigner = observer<ShortAnswerDesignerProps, {}>((props) => {
  log('render %o', props);

  const { className, schema } = props;
  const componentProps = schema['x-component-props'] as ShortAnswerDesignerComponentProps;

  return (
    <div className={classNames(styles.shortAnswerDesigner, className)}>
      {schema.title}
      <Form layout="vertical">
        <Form.Item label="Question" required>
          <Input
            defaultValue={componentProps.question}
            onBlur={(e) => {
              componentProps.question = e.target.value;
            }}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            defaultValue={componentProps.description}
            onBlur={(e) => {
              componentProps.description = e.target.value;
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
});
