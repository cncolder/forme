import React, { FC } from 'react';
import { AlignLeftOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Field, FieldProps, FieldValue } from '../Field';
import './style.less';

interface TextAreaValue extends FieldValue {
  label?: string;
}

export interface TextAreaProps extends FieldProps<TextAreaValue> {}

export const TextArea: FC<TextAreaProps> = (props) => {
  const {
    className,
    name = 'Long answer',
    logo = { bg: '#F2F0FF', icon: <AlignLeftOutlined /> },
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
      <div className="fm-t-text-area">
        <div className="fm-t-text-area-label">Text field label</div>
        <Input
          value={value?.label}
          onChange={(e) => onChange?.({ ...value, label: e.target.value })}
        />
      </div>
    </Field>
  );
};
