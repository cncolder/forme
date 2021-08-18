import { objectReorder } from './objectReorder';

describe('objectReorder', () => {
  it('should reorder keys of object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectReorder(obj, 'c', 'b');
    expect(result).toStrictEqual({
      a: 1,
      c: 3,
      b: 2,
    });
  });

  it('should reorder indexes of object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectReorder(obj, 2, 1);
    expect(result).toStrictEqual({
      a: 1,
      c: 3,
      b: 2,
    });
  });

  it('should reorder key to index of object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectReorder(obj, 'c', 1);
    expect(result).toStrictEqual({
      a: 1,
      c: 3,
      b: 2,
    });
  });

  it('should reorder index to key of object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectReorder(obj, 2, 'b');
    expect(result).toStrictEqual({
      a: 1,
      c: 3,
      b: 2,
    });
  });
});
