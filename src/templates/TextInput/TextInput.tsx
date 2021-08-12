import React, { FC } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';

import { Field, FieldProps, FieldValue } from '../Field';
import './style.less';

interface TextInputValue extends FieldValue {
  label?: string;
}

export interface TextInputProps extends FieldProps<TextInputValue> {}

export const TextInput: FC<TextInputProps> = (props) => {
  const { className, value, onChange } = props;

  return (
    <Field value={value} onChange={onChange}>
      <div className={classNames('fm-t-text-input', className)}>
        <div className="fm-t-text-input-label">Text field label</div>
        <Input
          value={value?.label}
          onChange={(e) => onChange({ ...value, label: e.target.value })}
        />
      </div>
    </Field>
  );
};
