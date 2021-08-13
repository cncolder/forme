import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import { DragDropContext, DragDropContextProps, Droppable, Draggable } from 'react-beautiful-dnd';
import { Layout, Tabs } from 'antd';

import { uid } from '../../utils';
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
      /** Drag form components and drop to form builder fields */
      if (e.source?.droppableId === 'templates' && e.destination?.droppableId === 'fields') {
        const entries = Object.entries<any>(schema.properties);
        entries.splice(e.destination.index, 0, [
          uid(),
          {
            type: 'string',
            widget: e.draggableId,
          },
        ]);
        const newSchema = { ...schema, properties: Object.fromEntries(entries) };
        console.log('new schema', newSchema);
        onChange?.(newSchema);
      }

      /** Drag from builder fields to itself */
      if (e.source?.droppableId === 'fields' && e.destination?.droppableId === 'fields') {
        const entries = Object.entries<any>(schema.properties);
        entries.splice(e.destination.index, 0, ...entries.splice(e.source.index, 1));
        const newSchema = { ...schema, properties: Object.fromEntries(entries) };
        console.log('new schema', newSchema);
        onChange?.(newSchema);
      }
    },
    [schema, onChange]
  );

  const handleFieldChange = useCallback(
    (key: string, property: any) => {
      const newSchema = { ...schema };
      newSchema.properties[key] = { ...newSchema.properties[key], ...property };
      console.log('new schema', newSchema);
      onChange?.(newSchema);
    },
    [schema, onChange]
  );

  const handleFieldRemove = useCallback(
    (key: string) => {
      const newSchema = { ...schema };
      delete newSchema.properties[key];
      console.log('new schema', newSchema);
      onChange?.(newSchema);
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
                      {Object.entries<any>(schema.properties).map(([key, property], index) => {
                        const { type, widget, ...value } = property;
                        const Template = templates[widget];
                        return (
                          <Draggable key={key} draggableId={key} index={index}>
                            {(dragProvided) => (
                              <div
                                key={key}
                                className="fm-b-field"
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                              >
                                <Template
                                  value={value}
                                  onChange={(property) => handleFieldChange(key, property)}
                                  onRemove={() => handleFieldRemove(key)}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                  )}
                </Droppable>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Schema" key="2">
                <pre style={{ padding: 8, height: '100%', backgroundColor: 'white' }}>
                  <code>{JSON.stringify(schema, null, 2)}</code>
                </pre>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Preview" key="3">
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
