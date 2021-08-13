import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import { DragDropContext, DragDropContextProps, Droppable, Draggable } from 'react-beautiful-dnd';
import { Layout, Tabs } from 'antd';

import { uniqId } from '../../utils';
import * as templates from '../../templates';
import { FormRender, useForm } from '../FormRender';
import './style.less';

export interface FormBuilderProps {
  className?: string;
  schema: any;
  onChange(schema: any): void;
}

export const FormBuilder: FC<FormBuilderProps> = (props) => {
  const { className, schema, onChange } = props;

  const [tabActiveKey, setTabActiveKey] = useState('1');

  const form = useForm();

  const handleDragEnd = useCallback<DragDropContextProps['onDragEnd']>(
    (e) => {
      console.log(e);
      /** Drag form components and drop to form builder */
      if (e.source?.droppableId === 'templates' && e.destination?.droppableId === 'fields') {
        const items = [...schema.items];
        items.splice(e.destination.index, 0, {
          id: uniqId(),
          type: 'string',
          widget: e.draggableId,
        });
        onChange?.({ ...schema, items });
      }
    },
    [schema, onChange]
  );

  const handleFieldRemove = useCallback(
    (index: number) => {
      const items = [...schema.items];
      items.splice(index, 1);
      onChange?.({ ...schema, items });
    },
    [schema, onChange]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Layout className={classNames('fm-b', className)}>
        <Layout.Header className="fm-b-header">
          <h1>Form Builder</h1>
        </Layout.Header>

        <Layout>
          <Layout.Content className="fm-b-fields">
            <Tabs
              className="fm-b-fields-tabs"
              type="card"
              activeKey={tabActiveKey}
              onTabClick={setTabActiveKey}
            >
              <Tabs.TabPane tab="Design" key="1">
                <Droppable droppableId="fields">
                  {(dropProvided, dropSnapshot) => (
                    <div
                      ref={dropProvided.innerRef}
                      className="fm-b-fields-container"
                      {...dropProvided.droppableProps}
                    >
                      {schema.items.map(({ id, widget, ...value }, index) => {
                        const Template = templates[widget];
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(dragProvided) => (
                              <div
                                key={id}
                                className="fm-b-field"
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                              >
                                <Template value={value} onRemove={() => handleFieldRemove(index)} />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                  )}
                </Droppable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Preview" key="2">
                <FormRender form={form} schema={schema} />
              </Tabs.TabPane>
            </Tabs>
          </Layout.Content>

          <Layout.Sider className="fm-b-templates" width={240}>
            <h2>Form components</h2>
            <Droppable droppableId="templates">
              {(dropProvided, dropSnapshot) => (
                <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                  {Object.entries(templates).map(([key, Template], index) => (
                    <Draggable key={key} draggableId={key} index={index}>
                      {(dragProvided) => (
                        <div
                          className="fm-b-template"
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <Template mode="item" />
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
