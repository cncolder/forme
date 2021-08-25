import React, { FC } from 'react';
import { connect } from '@formily/react';
import classNames from 'classnames';
import { debug } from '../../utils';
import styles from './Term.module.less';

export interface TermProps {
  className?: string;
  title: string;
}

const log = debug(import.meta.url);

export const Term = connect<FC<TermProps>>((props) => {
  log('Term render', props);

  const { className, children, title } = props;

  return (
    <div className={classNames(styles.term, className)}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
});
