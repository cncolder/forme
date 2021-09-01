import React, { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { builderConfigs, BuilderConfig } from '../../models';
import { DnD } from '../../utils';
import { ComponentDragSource } from './ComponentDragSource';

const dragableComponents = Object.entries(builderConfigs)
  .filter(([key, config]) => config.dragable)
  .map<BuilderConfig>(([key, config]) => ({ key, ...config }));

export const Library: FC = () => {
  return (
    <div>
      {dragableComponents.map((item, index) => (
        <Droppable
          key={item.key}
          droppableId={DnD.stringify({ id: item.key, type: 'Library', action: 'drop' })}
          type={['Section', 'Term'].includes(item.key) ? item.key : 'Component'}
        >
          {(provided) => (
            <div ref={provided.innerRef}>
              <Draggable
                draggableId={DnD.stringify({ id: item.key, type: 'Library', action: 'drag' })}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ComponentDragSource item={item} />
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};
