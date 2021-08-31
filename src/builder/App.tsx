import React, { FC, useMemo, useState, useEffect } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { Layout, Menu, Tabs } from 'antd';
import { autorun } from 'mobx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Builder, Preview, Library } from './components';
import { BuilderProvider, BuilderStore } from './models';
import { defaultSchema } from './seeds';
import styles from './App.module.less';

const monacoEditorOptions: EditorProps['options'] = {
  contextmenu: false,
  readOnly: true,
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
};

export const App: FC = () => {
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const builderStore = (window['store'] = useMemo(() => {
    try {
      const schema = JSON.parse(sessionStorage.getItem('forme-schema')) ?? defaultSchema;
      return new BuilderStore(schema);
    } catch {
      return new BuilderStore(defaultSchema);
    }
  }, []));

  useEffect(
    () =>
      autorun(() => {
        try {
          sessionStorage.setItem('forme-schema', JSON.stringify(builderStore.schema));
        } catch {}
      }),
    []
  );

  return (
    <BuilderProvider value={builderStore}>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </BuilderProvider>
  );
};
