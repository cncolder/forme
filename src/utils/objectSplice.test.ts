import { objectSplice } from './objectSplice';

describe('objectSplice', () => {
  it('should splice the key "b" of object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectSplice(obj, 'b', 1);
    expect(result).toStrictEqual({
      a: 1,
      c: 3,
    });
  });

  it('should splice the key 1 of object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectSplice(obj, 1, 1);
    expect(result).toStrictEqual({
      a: 1,
      c: 3,
    });
  });

  it('should splice the key "b" of object with "d"', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectSplice(obj, 'b', 1, ['d', 4]);
    expect(result).toStrictEqual({
      a: 1,
      d: 4,
      c: 3,
    });
  });

  it('should splice the key 1 of object with "d" and "e"', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectSplice(obj, 1, 1, ['d', 4], ['e', 5]);
    expect(result).toStrictEqual({
      a: 1,
      d: 4,
      e: 5,
      c: 3,
    });
  });

  it('should splice the key "b" of object with "d" map', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectSplice(obj, 'b', 1, { d: 4 });
    expect(result).toStrictEqual({
      a: 1,
      d: 4,
      c: 3,
    });
  });

  it('should splice the key 1 of object with "d" "e" and "f" map', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = objectSplice(obj, 1, 1, { d: 4 }, { e: 5, f: 6 });
    expect(result).toStrictEqual({
      a: 1,
      d: 4,
      e: 5,
      f: 6,
      c: 3,
    });
  });
});
