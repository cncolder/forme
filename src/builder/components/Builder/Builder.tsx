import React, { FC, createElement } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import { observer, DragType, BuilderConfig, TreeNode } from '../../models';
import { debug } from '../../utils';
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

  const [collected, dropRef] = useDrop(() => ({
    accept: DragType.Component,
    collect: (monitor) => ({
      className: classNames({ [styles.dropable]: monitor.isOver() && monitor.canDrop() }),
    }),
    canDrop: (item: BuilderConfig, monitor) => {
      if (item.name === 'Section' && monitor.isOver({ shallow: true })) {
        return true;
      }
    },
    drop: (item: BuilderConfig, monitor) => {
      log('drop %o %o', item, monitor);
      // schema.properties ??= {};
      // schema.properties[uid(item.schema.title + ' ')] = item.schema;
    },
  }));

  return (
    <div ref={dropRef} className={classNames(styles.builder, collected.className, className)}>
      {renderTreeNode(treeNode)}
    </div>
  );
});
