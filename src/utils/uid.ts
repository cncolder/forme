import { customAlphabet } from 'nanoid';

/** Generates nanoid in the custom alphabet A-Z a-z */
const nanoid = customAlphabet(
  Array(52)
    .fill(0)
    .map((_, i) => String.fromCharCode(i < 26 ? i + 65 : i + 71))
    .join(''),
  6
);

export const uid = (prefix = '') => {
  return prefix + nanoid();
};
