import React, { FC, ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import { Avatar, Button, Input } from 'antd';
import { BulbOutlined, CloseOutlined } from '@ant-design/icons';

import './style.less';

export interface FieldValue {
  title?: string;
  help?: string;
  question?: string;
  description?: string;
}

export interface FieldProps<V = FieldValue> {
  className?: string;
  children?: ReactNode;
  mode?: 'full' | 'item';
  logo?: {
    icon?: string;
    bg?: string;
  };
  name?: string;
  value?: V;
  onChange?(value: V): void;
  onRemove?(): void;
}

export const Field: FC<FieldProps> = (props) => {
  const { className, children, mode, logo, name, value = {}, onChange, onRemove } = props;
  const { title, help, question, description } = value;

  const handleChange = useCallback(
    (kv: FieldValue) => {
      onChange?.({ ...value, ...kv });
    },
    [value, onChange]
  );

  if (mode === 'item') {
    return (
      <div className={classNames('fm-t-field', 'fm-t-field--item', className)}>
        <Avatar
          className="fm-t-field-logo"
          style={{ color: 'black', backgroundColor: logo.bg }}
          shape="square"
          size="large"
        >
          {logo.icon}
        </Avatar>
        <div>{name}</div>
      </div>
    );
  }

  return (
    <div className={classNames('fm-t-field', className)}>
      <div className="fm-t-field-header">
        <Avatar
          className="fm-t-field-logo"
          style={{ color: 'black', backgroundColor: logo.bg }}
          shape="square"
          size="large"
        >
          {logo.icon}
        </Avatar>
        <div className="fm-t-field-title">{title}</div>
        <Button type="text" icon={<BulbOutlined />}>
          Edit help content
        </Button>
        <Button type="text" icon={<CloseOutlined />} onClick={onRemove}>
          Remove
        </Button>
      </div>

      <div className="fm-t-field-body">
        <div className="fm-t-field-question">
          <div className="fm-t-field-label">Question</div>
          <Input value={question} onChange={(e) => handleChange({ question: e.target.value })} />
        </div>
        <div className="fm-t-field-description">
          <div className="fm-t-field-label">Description text</div>
          <Input
            value={description}
            onChange={(e) => handleChange({ description: e.target.value })}
          />
        </div>
        <div className="fm-t-field-options">
          <div className="fm-t-field-label">Response options</div>
          {children}
        </div>
      </div>
    </div>
  );
};
