import React from 'react';
import { Input } from 'antd';

import { Field, FieldProps, FieldValue } from '../Field';
import './style.less';

interface TextInputValue extends FieldValue {
  label?: string;
}

export interface TextInputProps extends FieldProps<TextInputValue> {}

export function TextInput(props: TextInputProps) {
  const { className, value, onChange } = props;

  return (
    <Field className={className} logo={TextInput.logo} value={value} onChange={onChange}>
      <div className="fm-t-text-input">
        <div className="fm-t-text-input-label">Text field label</div>
        <Input
          value={value?.label}
          onChange={(e) => onChange?.({ ...value, label: e.target.value })}
        />
      </div>
    </Field>
  );
}

TextInput.label = 'Short answer';
TextInput.logo = { bg: '#F2F0FF', icon: 'A' };
