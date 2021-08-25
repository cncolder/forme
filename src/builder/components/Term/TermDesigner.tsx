import React, { FC } from 'react';
import { ISchema } from '@formily/json-schema';
import { observer } from '@formily/react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import { DragType } from '../../configs';
import { debug } from '../../utils';
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
  }));

  return (
    <div ref={dropRef} className={classNames(styles.termDesigner, collected.className, className)}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
});
