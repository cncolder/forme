import React, { FC, useState, useCallback } from 'react';
import FormRender, { useForm } from 'form-render';
import { DragDropContext } from 'react-beautiful-dnd';

export const App: FC = () => {
  const [schema, setSchema] = useState({ type: 'object', properties: {} });

  const form = useForm();

  const handleDragEnd = useCallback(() => {}, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        app
        <FormRender form={form} schema={schema} />
      </div>
    </DragDropContext>
  );
};
