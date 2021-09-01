import React, { FC, useMemo, useState, useCallback, useEffect } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { Layout, Menu, Tabs } from 'antd';
import { autorun } from 'mobx';
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { Builder, Preview, Library } from './components';
import { observer, BuilderStore, TreeNode } from './models';
import { defaultSchema } from './seeds';
import { debug, dnd } from './utils';
import styles from './App.module.less';

const log = debug(import.meta?.url);

const monacoEditorOptions: EditorProps['options'] = {
  contextmenu: false,
  readOnly: true,
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
};

export const App: FC = observer(() => {
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const builderStore = (window['store'] = useMemo(() => {
    try {
      const schema = JSON.parse(sessionStorage.getItem('forme-schema')) ?? defaultSchema;
      return new BuilderStore(schema);
    } catch {
      return new BuilderStore(defaultSchema);
    }
  }, []));

  const handleDragEnd = useCallback<DragDropContextProps['onDragEnd']>(
    (result) => {
      log('onDragEnd', result);

      if (result.reason !== 'DROP' || !result.draggableId || !result.destination) return;

      const drag = dnd.parse(result.draggableId);
      const drop = dnd.parse(result.destination.droppableId);

      if (drag.type === 'Library') {
        if (drag.id === 'Section' && drop.type === 'Builder') {
          builderStore.insertNewComponent(result.destination.index, drag.id, builderStore.treeNode);
        } else if (drag.id === 'Term' && drop.type === 'Section') {
          builderStore.insertNewComponent(
            result.destination.index,
            drag.id,
            builderStore.treeNode.findById(drop.id)
          );
        } else if (drop.type === 'Term') {
          const term = builderStore.treeNode.findById(drop.parentId)?.findById(drop.id);
          builderStore.insertNewComponent(result.destination.index, drag.id, term);
        }
      }
    },
    [builderStore]
  );

  useEffect(
    () =>
      autorun(() => {
        try {
          sessionStorage.setItem('forme-schema', JSON.stringify(builderStore.treeNode.toSchema()));
        } catch {}
      }),
    [builderStore]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Layout className={styles.app}>
        <Layout.Header className={styles.header}>
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
          <Layout.Sider className={styles.outline} width={240}>
            <h2>Form Outline</h2>
          </Layout.Sider>

          <Layout.Content className={styles.fields}>
            <Tabs
              className={styles.tabs}
              type="card"
              activeKey={tabActiveKey}
              onTabClick={setTabActiveKey}
            >
              <Tabs.TabPane tab="Design" key="1" style={{ overflowY: 'scroll' }}>
                <Builder treeNode={builderStore.treeNode} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Schema" key="2">
                <Editor
                  language="json"
                  value={JSON.stringify(builderStore.treeNode.toSchema(), null, 2)}
                  options={monacoEditorOptions}
                />
              </Tabs.TabPane>
              {/* <Tabs.TabPane tab="Preview" key="3">
                  <Preview schema={builderStore.schema} />
                </Tabs.TabPane> */}
            </Tabs>
          </Layout.Content>

          <Layout.Sider className={styles.library} width={240}>
            <h2>Component Library</h2>
            <Library />
          </Layout.Sider>
        </Layout>
      </Layout>
    </DragDropContext>
  );
});
