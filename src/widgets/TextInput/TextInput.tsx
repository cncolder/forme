import React, { FC } from 'react';
import { Input, InputProps } from 'antd';

export interface TextInputProps extends InputProps {}

export const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
  console.log('TextInput render', props);

  return <Input {...props} />;
};
