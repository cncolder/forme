import { uid } from './uid';

describe('uid', () => {
  it('generates a uniq id', () => {
    expect(uid()).toMatch(/^[A-Za-z]{6}$/);
  });

  it('generates a uniq id with prefix', () => {
    expect(uid('P_')).toMatch(/^P_[A-Za-z]{6}$/);
  });
});
