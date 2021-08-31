import React, { FC } from 'react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import SectionSvg from '../../assets/icons/Section.svg';
import { observer, DragType, BuilderConfig, TreeNode } from '../../models';
import { debug } from '../../utils';
import { StandardBuilderProps } from '../types';
import styles from './SectionBuilder.module.less';

interface SectionBuilderValues {
  title: string;
}

export interface SectionBuilderProps extends StandardBuilderProps<SectionBuilderValues> {
  className?: string;
}

const log = debug(import.meta.url);

export const SectionBuilder: FC<SectionBuilderProps> = observer((props) => {
  log('render %o', props);

  const { className, children, treeNode } = props;
  const { title } = treeNode;

  const [collected, dropRef] = useDrop(
    () => ({
      accept: DragType.Component,
      collect: (monitor) => ({
        className: classNames({ [styles.dropable]: monitor.isOver() && monitor.canDrop() }),
      }),
      canDrop: (item: BuilderConfig, monitor) => {
        if (item.name === 'Term' && monitor.isOver({ shallow: true })) {
          return true;
        }
      },
      drop: (item: BuilderConfig, monitor) => {
        log('drop %o %o', item, monitor);
        treeNode.append(TreeNode.fromSchema(item.schema));
      },
    }),
    [treeNode]
  );

  return (
    <div
      ref={dropRef}
      className={classNames(styles.sectionBuilder, collected.className, className)}
    >
      <div className={styles.header}>
        <img className={styles.icon} src={SectionSvg} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
});
