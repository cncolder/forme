import React, { FC, useState, useCallback } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import classNames from 'classnames';
import { DragDropContext, DragDropContextProps, Droppable, Draggable } from 'react-beautiful-dnd';
import * as templates from '../../templates';
import { Schema } from '../../types';
import { uid } from '../../utils';
import * as widgets from '../../widgets';
import './style.less';

export interface FormBuilderProps {
  className?: string;
  schema: Schema;
  onChange(schema: Schema): void;
}

export const FormBuilder: FC<FormBuilderProps> = (props) => {
  const { className, schema, onChange } = props;

  const [tabActiveKey, setTabActiveKey] = useState('1');

  const handleDragEnd = useCallback<DragDropContextProps['onDragEnd']>(
    (e) => {
      console.log('onDragEnd', e);
      /** Drag form components and drop to form builder fields */
      if (e.source?.droppableId === 'templates' && e.destination?.droppableId === 'fields') {
        const items = [...schema.items];
        items.splice(e.destination.index, 0, {
          id: uid(),
          type: 'string',
          widget: e.draggableId,
        });
        const newSchema = { ...schema, items };
        console.log('new schema', newSchema);
        onChange?.(newSchema);
      }

      /** Drag from builder fields to itself */
      if (e.source?.droppableId === 'fields' && e.destination?.droppableId === 'fields') {
        const items = [...schema.items];
        items.splice(e.destination.index, 0, ...items.splice(e.source.index, 1));
        const newSchema = { ...schema, items };
        console.log('new schema', newSchema);
        onChange?.(newSchema);
      }
    },
    [schema, onChange]
  );

  const handleFieldChange = useCallback(
    (index: number, value: any) => {
      const items = [...schema.items];
      items[index] = { ...items[index], ...value };
      const newSchema = { ...schema, items };
      console.log('new schema', newSchema);
      onChange?.(newSchema);
    },
    [schema, onChange]
  );

  const handleFieldRemove = useCallback(
    (index: number) => {
      const items = [...schema.items];
      items.splice(index, 1);
      const newSchema = { ...schema, items };
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
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['builder']}
            onSelect={(e) => (location.href = `/forme/${e.key}.html`)}
          >
            <Menu.Item key="builder">Builder</Menu.Item>
            <Menu.Item key="formily">Formily</Menu.Item>
          </Menu>
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
                      {schema.items.map((item, index) => {
                        const { id, type, widget, ...value } = item;
                        const Template = templates[widget];
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(dragProvided) => (
                              <div
                                className="fm-b-field"
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                              >
                                <Template
                                  value={value}
                                  onChange={(value) => handleFieldChange(index, value)}
                                  onRemove={() => handleFieldRemove(index)}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {dropProvided.placeholder}
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
                <div className="fm-b-preview">
                  {schema.items.map((item) => {
                    const Widget = widgets[item.widget];
                    return <Widget key={item.id} className="fm-b-widget" {...item} />;
                  })}
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Layout.Content>

          <Layout.Sider className="fm-b-templates" width={240}>
            <h2>Form components</h2>
            <Droppable droppableId="templates" isDropDisabled>
              {(dropProvided, dropSnapshot) => (
                <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                  {Object.entries(templates).map(([key, Template], index) => (
                    <Draggable key={key} draggableId={key} index={index}>
                      {(dragProvided, dragSnapshot) => (
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
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </Layout.Sider>
        </Layout>
      </Layout>
    </DragDropContext>
  );
};
