import React, { FC, createElement } from 'react';
import { ISchema } from '@formily/json-schema';
import { observer } from '@formily/reactive-react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import { DragType, ComponentConfig } from '../../configs';
import { debug, uid } from '../../utils';
import {
  SectionDesigner,
  TermDesigner,
  ShortAnswerDesigner,
  LongAnswerDesigner,
} from '../designers';
import styles from './Designer.module.less';

export interface DesignerProps {
  className?: string;
  schema: ISchema;
  onChange(schema: ISchema): void;
}

const log = debug(import.meta.url);

const designers = {
  SectionDesigner,
  TermDesigner,
  ShortAnswerDesigner,
  LongAnswerDesigner,
};

const SchemaFragment: FC = ({ children }) => {
  return <>{children}</>;
};

const renderSchema = (schema: ISchema, key = '') => {
  const { 'x-component': component, properties = {} } = schema;
  const Component = designers[`${component}Designer`] || SchemaFragment;

  return createElement(
    Component,
    { key, schema },
    Object.entries(properties).map(([key, schema]) => renderSchema(schema, key))
  );
};

export const Designer = observer<DesignerProps, {}>((props) => {
  log('render %o', props);

  const { className, schema } = props;

  const [collected, dropRef] = useDrop(() => ({
    accept: DragType.Component,
    collect: (monitor) => ({
      className: classNames({ [styles.dropable]: monitor.isOver() && monitor.canDrop() }),
    }),
    canDrop: (item: ComponentConfig, monitor) => {
      if (item.name === 'Section' && monitor.isOver({ shallow: true })) {
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
    <div ref={dropRef} className={classNames(styles.designer, collected.className, className)}>
      {renderSchema(schema)}
    </div>
  );
});
