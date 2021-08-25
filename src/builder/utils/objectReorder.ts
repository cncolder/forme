/** Reorder the key of the object at the specified index. It's immutable to the original object. */
export const objectReorder = <T>(
  object: T,
  fromKey: string | number,
  toKey: string | number
): T => {
  const entries = Object.entries<any>(object);
  const from =
    typeof fromKey === 'number' ? fromKey : entries.findIndex((entry) => entry[0] === fromKey);
  const to = typeof toKey === 'number' ? toKey : entries.findIndex((entry) => entry[0] === toKey);

  entries.splice(to, 0, ...entries.splice(from, 1));

  return Object.fromEntries(entries) as T;
};
