import React from 'react';
import { ISchema } from '@formily/json-schema';
import { observer } from '@formily/reactive-react';
import classNames from 'classnames';
import SectionSvg from '../../assets/icons/Section.svg';
import { debug } from '../../utils';
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

  return (
    <div className={classNames(styles.sectionDesigner, className)}>
      <div className={styles.header}>
        <img className={styles.icon} src={SectionSvg} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
});
