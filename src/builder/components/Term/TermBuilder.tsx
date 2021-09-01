import React, { FC } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button, Divider, Typography } from 'antd';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { observer } from '../../models';
import { debug, dnd } from '../../utils';
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

  return (
    <Draggable
      draggableId={dnd.stringify({
        type: 'Term',
        id: treeNode.id,
        action: 'drag',
        parentId: treeNode.parent.id,
      })}
      index={treeNode.index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={classNames(styles.termBuilder, className)}
          {...provided.draggableProps}
        >
          <div className={styles.header} {...provided.dragHandleProps}>
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
          <Droppable
            droppableId={dnd.stringify({
              type: 'Term',
              id: treeNode.id,
              action: 'drop',
              parentId: treeNode.parent.id,
            })}
            type="Component"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={classNames(styles.body, { [styles.dragover]: snapshot.isDraggingOver })}
                {...provided.droppableProps}
              >
                {!isEmpty(children) ? (
                  children
                ) : (
                  <Draggable
                    isDragDisabled
                    draggableId={dnd.stringify({
                      type: 'Term',
                      id: treeNode.id,
                      action: 'drop',
                      parentId: treeNode.parent.id,
                      placeholder: true,
                    })}
                    index={treeNode.index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        className={styles.empty}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Divider dashed plain>
                          <Typography.Text type="secondary">
                            Drag and drop a component into the term
                          </Typography.Text>
                        </Divider>
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
});
