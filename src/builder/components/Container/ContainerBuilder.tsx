import React, { FC, useCallback } from 'react';
import { FileImageOutlined, BulbOutlined, MoreOutlined } from '@ant-design/icons';
import { Modal, Input, Upload, Button, Dropdown, Menu, Form } from 'antd';
import classNames from 'classnames';
import { observer } from '../../models';
import { debug } from '../../utils';
import { StandardBuilderProps } from '../types';
import styles from './ContainerBuilder.module.less';

export interface ContainerBuilderValues {
  question?: string;
  description?: string;
  help?: string;
}

export interface ContainerBuilderProps extends StandardBuilderProps<ContainerBuilderValues> {
  className?: string;
  icon?: string;
}

const log = debug(import.meta?.url);

export const ContainerBuilder: FC<ContainerBuilderProps> = observer((props) => {
  log('render %o', props);

  const { className, children, icon, treeNode, onRename, onDuplicate, onDelete } = props;
  const componentProps = treeNode.props;

  const [modal, contextHolder] = Modal.useModal();

  const handleEditHelpClick = useCallback(() => {
    let modalValue = { ...componentProps };
    modal.confirm({
      title: 'Edit help content',
      icon: false,
      closable: true,
      maskClosable: true,
      okText: 'Save',
      cancelButtonProps: { style: { display: 'none' } },
      content: (
        <Form layout="vertical">
          <Form.Item label="Help text">
            <Input.TextArea
              ref={(node) => node?.focus()}
              rows={4}
              defaultValue={modalValue.help}
              onBlur={(e) => (modalValue.help = e.target.value)}
            ></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Upload>
              <Button icon={<FileImageOutlined />}>Upload image</Button>
            </Upload>
          </Form.Item>
        </Form>
      ),
      onOk: (close) => {
        componentProps.help = modalValue.help;
        close();
      },
    });
  }, [modal, componentProps]);

  return (
    <div className={classNames(styles.containerBuilder, className)}>
      <div className={styles.header}>
        <img className={styles.logo} src={icon} />
        <div className={styles.title}></div>
        <Button type="text" icon={<BulbOutlined />} onClick={handleEditHelpClick}>
          Edit help content
        </Button>
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="title" disabled>
                COMPONENT MENU
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
        <Form layout="vertical">
          <Form.Item label="Question" required>
            <Input
              defaultValue={componentProps.question}
              onBlur={(e) => {
                componentProps.question = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              defaultValue={componentProps.description}
              onBlur={(e) => {
                componentProps.description = e.target.value;
              }}
            />
          </Form.Item>
        </Form>
        <div className={styles.response}>
          <div className={styles.label}>Response settings</div>
          {children}
        </div>
      </div>

      {contextHolder}
    </div>
  );
});
