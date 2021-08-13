import { nanoid } from 'nanoid';

export const uniqId = (prefix = '_') => {
  return prefix + nanoid();
};
