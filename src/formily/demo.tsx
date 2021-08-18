import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

import styles from './demo.module.less';

const App: FC = () => {
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
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
