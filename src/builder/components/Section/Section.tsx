import React, { FC } from 'react';
import { connect } from '@formily/react';
import classNames from 'classnames';
import SectionSvg from '../../assets/icons/Section.svg';
import { debug } from '../../utils';
import styles from './Section.module.less';

export interface SectionProps {
  className?: string;
  title: string;
}

const log = debug(import.meta.url);

export const Section = connect<FC<SectionProps>>((props) => {
  log('Section render', props);

  const { className, children, title } = props;

  return (
    <div className={classNames(styles.section, className)}>
      <div className={styles.header}>
        <img className={styles.icon} src={SectionSvg} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
});
