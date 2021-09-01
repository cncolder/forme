import React, { FC } from 'react';
import classNames from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SectionSvg from '../../assets/icons/Section.svg';
import { observer } from '../../models';
import { debug, DnD } from '../../utils';
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
  const { title } = treeNode.props;

  return (
    <Draggable
      draggableId={DnD.stringify({
        type: 'Section',
        id: treeNode.id,
        action: 'drag',
      })}
      index={treeNode.index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={classNames(styles.sectionBuilder, className)}
          {...provided.draggableProps}
        >
          <div className={styles.header} {...provided.dragHandleProps}>
            <img className={styles.icon} src={SectionSvg} />
            <div className={styles.title}>{title}</div>
          </div>
          <Droppable
            droppableId={DnD.stringify({
              type: 'Section',
              id: treeNode.id,
              action: 'drop',
            })}
            type="Term"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={classNames(styles.body, { [styles.dragover]: snapshot.isDraggingOver })}
                {...provided.droppableProps}
              >
                {children}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
});
