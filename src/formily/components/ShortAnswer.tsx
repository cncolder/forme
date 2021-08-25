import React, { FC } from 'react';
import { connect } from '@formily/react';

export interface ShortAnswerProps {
  question?: string;
  description?: string;
}

export const ShortAnswerComponent: FC<ShortAnswerProps> = (props) => {
  console.log('ShortAnswerComponent render', props);
  const { children, question, description, ...restProps } = props;

  return <div>{children}</div>;
};

export const ShortAnswer: FC<ShortAnswerProps> = connect(ShortAnswerComponent);
