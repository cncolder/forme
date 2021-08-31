import React, { FC } from 'react';
import { Form, Input } from 'antd';
import classNames from 'classnames';
import * as icons from '../../assets/icons';
import { observer } from '../../models';
import { debug } from '../../utils';
import { ContainerBuilder, ContainerBuilderValues } from '../Container';
import { StandardBuilderProps } from '../types';
import styles from './LongAnswerBuilder.module.less';

interface LongAnswerBuilderValues extends ContainerBuilderValues {
  label: string;
}

export interface LongAnswerBuilderProps extends StandardBuilderProps<LongAnswerBuilderValues> {
  className?: string;
}

const log = debug(import.meta.url);

export const LongAnswerBuilder: FC<LongAnswerBuilderProps> = observer((props) => {
  log('render %o', props);

  const { className, treeNode, onRename, onDuplicate, onDelete } = props;
  const componentProps = treeNode.props;

  return (
    <ContainerBuilder
      icon={icons.LongAnswer}
      treeNode={treeNode}
      onRename={onRename}
      onDuplicate={onDuplicate}
      onDelete={onDelete}
    >
      <div className={classNames(styles.shortAnswerBuilder, className)}>
        <Form>
          <Form.Item label="Text field label" required>
            <Input
              defaultValue={componentProps.label}
              onBlur={(e) => (componentProps.label = e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
    </ContainerBuilder>
  );
});
