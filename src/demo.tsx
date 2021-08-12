import React, { FC, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import FormRender, { useForm } from 'form-render';
import { DragDropContext } from 'react-beautiful-dnd';
import 'antd/dist/antd.css';

import { TextInput } from './templates';

const App: FC = () => {
  const [schema, setSchema] = useState({ type: 'object', properties: {} });

  const form = useForm();

  const handleDragEnd = useCallback(() => {}, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <FormRender form={form} schema={schema} />
      </div>
      <TextInput value={{ logo: { bg: '#F2F0FF', icon: 'A' }, title: 'Short answer 1' }} />
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
