import React, { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { PreviewText } from '@formily/antd';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { Input, InputProps } from 'antd';

export const ShortAnswer: FC<InputProps> = connect(
  Input,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: (
        <span>
          {field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}
        </span>
      ),
    };
  }),
  mapReadPretty(PreviewText.Input)
);
