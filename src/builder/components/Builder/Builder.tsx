import React, { FC, createElement } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';
import { observer, TreeNode } from '../../models';
import { debug, DnD } from '../../utils';
import {
  ContainerBuilder,
  SectionBuilder,
  TermBuilder,
  ShortAnswerBuilder,
  LongAnswerBuilder,
} from '../builders';
import { StandardBuilderProps } from '../types';
import styles from './Builder.module.less';

export interface BuilderProps {
  className?: string;
  treeNode: TreeNode;
}

const log = debug(import.meta.url);

const builders = {
  ContainerBuilder,

  SectionBuilder,
  TermBuilder,
  ShortAnswerBuilder,
  LongAnswerBuilder,
};

const renderTreeNode = (treeNode: TreeNode) => {
  const { component, children } = treeNode;
  const Component: FC<StandardBuilderProps> = builders[`${component}Builder`];

  const renderChildren = () => children.map((child) => renderTreeNode(child));

  if (!Component) return renderChildren();

  const onDuplicate = () => {
    treeNode.duplicate();
  };
  const onDelete = () => {
    Modal.confirm({
      title: 'You’re about to delete a component',
      content:
        'Are you sure you want to delete this component? Any saved configurations and content for this term will also be deleted as well.',
      centered: true,
      closable: true,
      maskClosable: true,
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        treeNode.remove();
      },
    });
  };

  const componentElement = createElement(
    Component,
    { key: treeNode.id, treeNode, onDuplicate, onDelete },
    renderChildren()
  );

  return componentElement;
};

export const Builder: FC<BuilderProps> = observer((props) => {
  log('render %o', props);

  const { className, treeNode } = props;

  return (
    <Droppable
      droppableId={DnD.stringify({ id: '/', type: 'Builder', action: 'drop' })}
      type="Section"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={classNames(
            styles.builder,
            { [styles.dragover]: snapshot.isDraggingOver },
            className
          )}
        >
          {renderTreeNode(treeNode)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
});
