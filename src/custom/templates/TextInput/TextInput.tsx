import React, { FC } from 'react';
import { Input } from 'antd';
import { FontColorsOutlined } from '@ant-design/icons';

import { Field, FieldProps, FieldValue } from '../Field';
import './style.less';

interface TextInputValue extends FieldValue {
  label?: string;
}

export interface TextInputProps extends FieldProps<TextInputValue> {}

export const TextInput: FC<TextInputProps> = (props) => {
  const {
    className,
    name = 'Short answer',
    logo = { bg: '#F2F0FF', icon: <FontColorsOutlined /> },
    value,
    onChange,
    ...fieldProps
  } = props;

  return (
    <Field
      className={className}
      name={name}
      logo={logo}
      value={value}
      onChange={onChange}
      {...fieldProps}
    >
      <div className="fm-t-text-input">
        <div className="fm-t-text-input-label">Text field label</div>
        <Input
          value={value?.label}
          onChange={(e) => onChange?.({ ...value, label: e.target.value })}
        />
      </div>
    </Field>
  );
};
