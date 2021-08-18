import 'antd/dist/antd.css';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu } from 'antd';
import { App } from './App';
import styles from './demo.module.less';

const Demo: FC = () => {
  return (
    <Layout className={styles.page}>
      <Layout.Header className={styles.header}>
        <h1>Form Builder</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['formily']}
          onSelect={(e) => (location.href = `/forme/${e.key}.html`)}
        >
          <Menu.Item key="formily">Formily</Menu.Item>
          <Menu.Item key="custom">Custom</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
        <App />
      </Layout.Content>
    </Layout>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
