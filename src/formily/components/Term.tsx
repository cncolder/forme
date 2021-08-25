import React, { FC } from 'react';
import { Card, CardProps } from 'antd';
import classNames from 'classnames';
import styles from './Term.module.less';

export const Term: FC<CardProps> = (props) => {
  const { className, ...rest } = props;

  return <Card className={classNames(styles.term, className)} {...rest} />;
};
