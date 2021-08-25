import React, { FC } from 'react';
import { Card, CardProps } from 'antd';
import classNames from 'classnames';
import styles from './Section.module.less';

export const Section: FC<CardProps> = (props) => {
  const { className, ...rest } = props;

  return <Card className={classNames(styles.section, className)} {...rest} />;
};
