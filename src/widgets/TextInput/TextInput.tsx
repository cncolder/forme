import React, { FC } from 'react';
import { Input, InputProps } from 'antd';

export interface TextInputProps extends Input {}

export const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
  return <Input {...props} />;
};
