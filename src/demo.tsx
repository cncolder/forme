import React, { FC, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import FormRender, { useForm } from 'form-render';
import 'antd/dist/antd.css';

import { uniqId } from './utils';
import { FormBuilder } from './components';
import './demo.less';

const DEFAULT_SCHEMA = {
  title: '',
  type: 'array',
  items: [
    {
      id: uniqId(),
      type: 'string',
      widget: 'TextInput',
    },
  ],
};

const App: FC = () => {
  const [schema, setSchema] = useState(() => DEFAULT_SCHEMA);

  const form = useForm();

  const handleDragEnd = useCallback(() => {}, []);

  return (
    <FormBuilder schema={schema} onChange={setSchema} />
    // <FormRender form={form} schema={schema} />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
