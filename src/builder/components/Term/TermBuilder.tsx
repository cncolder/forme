import React, { FC } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button, Divider, Typography } from 'antd';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useDrop } from 'react-dnd';
import { observer, DragType, BuilderConfig, TreeNode } from '../../models';
import { debug } from '../../utils';
import { StandardBuilderProps } from '../types';
import styles from './TermBuilder.module.less';

interface TermBuilderValues {
  title: string;
}

export interface TermBuilderProps extends StandardBuilderProps<TermBuilderValues> {
  className?: string;
}

const log = debug(import.meta.url);

export const TermBuilder: FC<TermBuilderProps> = observer((props) => {
  log('render %o', props);

  const { className, children, treeNode, onRename, onDuplicate, onDelete } = props;
  const { title } = treeNode.props;

  const [collected, dropRef] = useDrop(
    () => ({
      accept: DragType.Component,
      collect: (monitor) => ({
        className: classNames({ [styles.dropable]: monitor.isOver() && monitor.canDrop() }),
      }),
      canDrop: (item: BuilderConfig, monitor) => {
        return !['Section', 'Term'].includes(item.name);
      },
      drop: (item: BuilderConfig, monitor) => {
        log('drop %o %o', item, monitor);
        treeNode.append(TreeNode.fromSchema(item.schema));
      },
    }),
    [treeNode]
  );

  return (
    <div ref={dropRef} className={classNames(styles.termBuilder, collected.className, className)}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="title" disabled>
                TERM MENU
              </Menu.Item>
              <Menu.Item key="rename" onClick={onRename}>
                Rename
              </Menu.Item>
              <Menu.Item key="duplicate" onClick={onDuplicate}>
                Duplicate
              </Menu.Item>
              <Menu.Item key="delete" danger onClick={onDelete}>
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button size="small" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
      <div className={styles.body}>
        {!isEmpty(children) ? (
          children
        ) : (
          <Divider dashed plain>
            <Typography.Text type="secondary">
              Drag and drop a component into the term
            </Typography.Text>
          </Divider>
        )}
      </div>
    </div>
  );
});
