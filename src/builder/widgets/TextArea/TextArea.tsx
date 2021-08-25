import React, { FC } from 'react';
import { Input } from 'antd';
import { TextAreaField } from '../../types';
import { Field } from '../Field';
import './style.less';

export interface TextAreaProps extends TextAreaField {
  className?: string;
}

export const TextArea: FC<TextAreaProps> = (props: TextAreaProps) => {
  const { id, className, type, widget, question, description, help, label, ...rest } = props;

  return (
    <Field className={className} question={question} description={description} help={help}>
      <div className="fm-w-text-area">
        <div className="fm-w-text-area-label">{label}</div>
        <Input.TextArea rows={4} {...rest} />
      </div>
    </Field>
  );
};
