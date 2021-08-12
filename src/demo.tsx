import React, { FC, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import FormRender, { useForm } from 'form-render';
import 'antd/dist/antd.css';

import { FormBuilder } from './components';

const App: FC = () => {
  const [schema, setSchema] = useState({ type: 'object', properties: {} });

  const form = useForm();

  const handleDragEnd = useCallback(() => {}, []);

  return (
    <FormBuilder />
    // <FormRender form={form} schema={schema} />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
