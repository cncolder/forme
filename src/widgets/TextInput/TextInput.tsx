import React, { FC } from 'react';
import { Input } from 'antd';

import { TextInputField } from '../../types';
import { Field } from '../Field';
import './style.less';

export interface TextInputProps extends TextInputField {
  className?: string;
}

export const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
  const { className, question, description, help, label, ...rest } = props;

  return (
    <Field className={className} question={question} description={description} help={help}>
      <div className="fm-w-text-input">
        <div className="fm-w-text-input-label">{label}</div>
        <Input {...rest} />
      </div>
    </Field>
  );
};
