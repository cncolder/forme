import { GlobalDragSource } from '@designable/core';
import { inputs } from './inputs';
import { layouts } from './layouts';

export const setSourcesByGroup = () => {
  GlobalDragSource.setSourcesByGroup('layouts', layouts);
  GlobalDragSource.setSourcesByGroup('inputs', inputs);
};
