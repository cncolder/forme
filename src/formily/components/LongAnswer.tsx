import React, { FC } from 'react';
import { PreviewText } from '@formily/antd';
import { connect, mapReadPretty } from '@formily/react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input/TextArea';

export const LongAnswer: FC<TextAreaProps> = connect(
  Input.TextArea,
  mapReadPretty(PreviewText.Input)
);
