import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { uid } from './utils';
import { FormBuilder } from './components';
import './demo.less';

const DEFAULT_SCHEMA = {
  type: 'object',
  properties: {
    [uid()]: {
      type: 'string',
      widget: 'TextInput',
    },
  },
};

const App: FC = () => {
  const [schema, setSchema] = useState(() => DEFAULT_SCHEMA);

  return <FormBuilder schema={schema} onChange={setSchema} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
