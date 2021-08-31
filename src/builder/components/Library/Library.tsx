import React, { FC } from 'react';
import { builderConfigs, BuilderConfig } from '../../models';
import { ComponentDragSource } from './ComponentDragSource';

const dragableComponents = Object.entries(builderConfigs)
  .filter(([key, config]) => config.dragable)
  .map<BuilderConfig>(([key, config]) => ({ key, ...config }));

export const Library: FC = () => {
  return (
    <div>
      {dragableComponents.map((item) => (
        <ComponentDragSource key={item.key} item={item} />
      ))}
    </div>
  );
};
