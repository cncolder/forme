import 'antd/dist/antd.css';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useSessionStorage } from 'react-use';
import { FormBuilder } from './components';
import { Schema } from './types';
import { uid } from './utils';
import './demo.less';

const DEFAULT_SCHEMA: Schema = {
  formId: '1',
  items: [
    {
      id: uid(),
      type: 'string',
      widget: 'TextInput',
    },
  ],
};

const App: FC = () => {
  const [schema, setSchema] = useSessionStorage('forme-schema', DEFAULT_SCHEMA);

  return <FormBuilder schema={schema} onChange={setSchema} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
