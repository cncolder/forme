import React, { FC, useMemo, useState, useEffect } from 'react';
import { observable, autorun } from '@formily/reactive';
import Editor, { EditorProps } from '@monaco-editor/react';
import { Layout, Menu, Tabs } from 'antd';
import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSessionStorage } from 'react-use';
import { Designer, Preview, Library } from './components';
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

  const [schema, setSchema] = useSessionStorage('forme-schema', defaultSchema);
  const observableSchema = useMemo(() => observable(schema), []);

  useEffect(
    () =>
      autorun(() => {
        setSchema(observableSchema);
      }),
    []
  );

  return (
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
              <Tabs.TabPane tab="Design" key="1">
                <Designer schema={observableSchema} onChange={setSchema} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Schema" key="2">
                <Editor
                  language="json"
                  value={JSON.stringify(schema, null, 2)}
                  options={monacoEditorOptions}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Preview" key="3">
                <Preview schema={schema} />
              </Tabs.TabPane>
            </Tabs>
          </Layout.Content>

          <Layout.Sider className={styles.library} width={240}>
            <h2>Component Library</h2>
            <Library />
          </Layout.Sider>
        </Layout>
      </Layout>
    </DndProvider>
  );
};
