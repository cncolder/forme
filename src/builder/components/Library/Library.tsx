import React, { FC } from 'react';
import { componentConfigs, ComponentConfig } from '../../configs';
import { ComponentDragSource } from './ComponentDragSource';

const dragableComponents = Object.entries(componentConfigs)
  .filter(([key, config]) => config.dragable)
  .map<ComponentConfig>(([key, config]) => ({ key, ...config }));

export const Library: FC = () => {
  return (
    <div>
      {dragableComponents.map((item) => (
        <ComponentDragSource key={item.key} item={item} />
      ))}
    </div>
  );
};
