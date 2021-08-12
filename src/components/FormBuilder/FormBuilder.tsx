import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Layout, Avatar } from 'antd';

import * as templates from '../../templates';
import './style.less';

export interface FormBuilderProps {
  className?: string;
  schema?: any;
  onChange?(schema: any): void;
}

const DEFAULT_SCHEMA = {
  title: '',
  type: 'array',
  items: [
    {
      id: 1,
      widget: 'TextInput',
    },
    {
      id: 2,
      widget: 'TextInput',
    },
  ],
};

export const FormBuilder: FC<FormBuilderProps> = (props) => {
  const { className, schema = DEFAULT_SCHEMA, onChange } = props;

  const handleDragEnd = useCallback(() => {}, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Layout className={classNames('fm-b', className)}>
        <Layout.Header className="fm-b-header">
          <h1>Form Builder</h1>
        </Layout.Header>

        <Layout>
          <Layout.Content className="fm-b-fields">
            <Droppable droppableId="fields">
              {(dropProvided, dropSnapshot) => (
                <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                  {schema.items.map(({ id, widget, ...value }, index) => {
                    const Template = templates[widget];
                    return (
                      <Draggable key={id} draggableId={String(id)} index={index}>
                        {(dragProvided) => (
                          <div
                            key={id}
                            className="fm-b-field"
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            <Template value={value} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </Layout.Content>

          <Layout.Sider className="fm-b-templates" width={240}>
            <h2>Form components</h2>
            <Droppable droppableId="templates">
              {(dropProvided, dropSnapshot) => (
                <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                  {Object.values(templates).map((Template, index) => (
                    <Draggable key={Template.label} draggableId={Template.label} index={index}>
                      {(dragProvided) => (
                        <div
                          className="fm-b-template"
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <Avatar
                            className="fm-b-template-logo"
                            style={{ color: 'black', backgroundColor: Template.logo.bg }}
                            shape="square"
                            size="large"
                          >
                            {Template.logo.icon}
                          </Avatar>
                          <div>{Template.label}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </Layout.Sider>
        </Layout>
      </Layout>
    </DragDropContext>
  );
};
