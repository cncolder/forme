import React, { FC } from 'react';
import classNames from 'classnames';
import { BuilderConfig } from '../../models';
import styles from './ComponentDragSource.module.less';

export interface ComponentDragSourceProps {
  className?: string;
  item: BuilderConfig;
}

export const ComponentDragSource: FC<ComponentDragSourceProps> = (props) => {
  const { className, children, item } = props;

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.icon}>
        {typeof item.icon === 'string' ? <img src={item.icon} /> : item.icon}
      </div>
      <div className={styles.name}>{item.name}</div>
      {children}
    </div>
  );
};
