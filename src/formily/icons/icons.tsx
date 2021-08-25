import React from 'react';
import { BookOutlined, EnterOutlined } from '@ant-design/icons';
import LongAnswer from './LongAnswer.svg';
import ShortAnswer from './ShortAnswer.svg';
import SingleCheckbox from './SingleCheckbox.svg';

export const icons = {
  Section: <BookOutlined />,
  Term: <EnterOutlined style={{ transform: 'rotateY(180deg)' }} />,
  ShortAnswer,
  LongAnswer,
  SingleCheckbox,
};
