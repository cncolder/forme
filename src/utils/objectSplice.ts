/** Splice the key/value pair into the object at the specified index. It's immutable to the original object. */
export const objectSplice = <T>(
  object: T,
  startKey: string | number,
  deleteCount?: number,
  ...restItems: ({ [key: string]: any } | [string, any])[]
): T => {
  const entries = Object.entries<any>(object);
  const start =
    typeof startKey === 'number' ? startKey : entries.findIndex((entry) => entry[0] === startKey);
  const items = restItems.flatMap((item) => (Array.isArray(item) ? [item] : Object.entries(item)));

  entries.splice(start, deleteCount, ...items);

  return Object.fromEntries(entries) as T;
};
