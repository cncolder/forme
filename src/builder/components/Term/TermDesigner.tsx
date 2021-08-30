import React from 'react';
import { ISchema } from '@formily/json-schema';
import { observer } from '@formily/react';
import { Divider, Typography } from 'antd';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useDrop } from 'react-dnd';
import { DragType, ComponentConfig } from '../../configs';
import { debug, uid } from '../../utils';
import styles from './TermDesigner.module.less';

interface TermDesignerComponentProps {
  title: string;
}

export interface TermDesignerProps {
  className?: string;
  schema: ISchema<any, any, any, TermDesignerComponentProps>;
}

const log = debug(import.meta.url);

export const TermDesigner = observer<TermDesignerProps, {}>((props) => {
  log('render %o', props);

  const { className, children, schema } = props;
  const { title } = schema['x-component-props'] as TermDesignerComponentProps;

  const [collected, dropRef] = useDrop(() => ({
    accept: DragType.Component,
    collect: (monitor) => ({
      className: classNames({ [styles.dropable]: monitor.isOver() && monitor.canDrop() }),
    }),
    drop: (item: ComponentConfig, monitor) => {
      log('drop %o %o', item, monitor);
      schema.properties ??= {};
      schema.properties[uid()] = item.schema;
    },
  }));

  return (
    <div ref={dropRef} className={classNames(styles.termDesigner, collected.className, className)}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
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
