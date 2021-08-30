import React from 'react';
import { ISchema } from '@formily/json-schema';
import { observer } from '@formily/reactive-react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import SectionSvg from '../../assets/icons/Section.svg';
import { DragType, ComponentConfig } from '../../configs';
import { debug, uid } from '../../utils';
import styles from './SectionDesigner.module.less';

interface SectionDesignerComponentProps {
  title: string;
}

export interface SectionDesignerProps {
  className?: string;
  schema: ISchema<any, any, any, SectionDesignerComponentProps>;
}

const log = debug(import.meta.url);

export const SectionDesigner = observer<SectionDesignerProps, {}>((props) => {
  log('render %o', props);

  const { className, children, schema } = props;
  const { title } = schema['x-component-props'] as SectionDesignerComponentProps;

  const [collected, dropRef] = useDrop(() => ({
    accept: DragType.Component,
    collect: (monitor) => ({
      className: classNames({ [styles.dropable]: monitor.isOver() && monitor.canDrop() }),
    }),
    canDrop: (item: ComponentConfig, monitor) => {
      if (item.name === 'Term' && monitor.isOver({ shallow: true })) {
        return true;
      }
    },
    drop: (item: ComponentConfig, monitor) => {
      log('drop %o %o', item, monitor);
      schema.properties ??= {};
      schema.properties[uid(item.schema.title + ' ')] = item.schema;
    },
  }));

  return (
    <div
      ref={dropRef}
      className={classNames(styles.sectionDesigner, collected.className, className)}
    >
      <div className={styles.header}>
        <img className={styles.icon} src={SectionSvg} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
});
