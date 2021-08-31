import React, { FC } from 'react';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';
import { DragType, BuilderConfig } from '../../models';
import styles from './ComponentDragSource.module.less';

export interface ComponentDragSourceProps {
  className?: string;
  item: BuilderConfig;
}

export const ComponentDragSource: FC<ComponentDragSourceProps> = (props) => {
  const { className, children, item } = props;

  const [collected, dragRef] = useDrag(
    () => ({
      type: DragType.Component,
      item,
    }),
    [item]
  );

  return (
    <div ref={dragRef} className={classNames(styles.root, className)} {...collected}>
      <div className={styles.icon}>
        {typeof item.icon === 'string' ? <img src={item.icon} /> : item.icon}
      </div>
      <div className={styles.name}>{item.name}</div>
      {children}
    </div>
  );
};
