import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Alert } from 'antd';

import './style.less';

export interface FieldProps {
  className?: string;
  children?: ReactNode;
  question?: string;
  description?: string;
  help?: string;
}

export const Field: FC<FieldProps> = (props) => {
  const { className, children, question, description, help } = props;

  return (
    <div className={classNames('fm-w-field', className)}>
      <div className="fm-w-field-main">
        <h3 className="fm-w-field-question">{question}</h3>
        <p className="fm-w-field-description">{description}</p>
        {children}
      </div>
      <div className="fm-w-field-aside">
        <Alert
          className="fm-w-field-help"
          type="info"
          showIcon
          message="Pro tip"
          description={help}
        />
      </div>
    </div>
  );
};
