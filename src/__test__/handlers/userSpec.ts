import {
  create_user,
  show_user,
  index_user,
  authenticate,
  verifyAuthToken,
  view_userOrder,
} from '../../handlers/users.handlers';

describe('User handler', () => {
  it('should have an create_user method', () => {
    expect(create_user).toBeDefined();
  });
  it('should have an show_user method', () => {
    expect(show_user).toBeDefined();
  });
  it('should have an index_user method', () => {
    expect(index_user).toBeDefined();
  });
  it('should have an authenticate method', () => {
    expect(authenticate).toBeDefined();
  });
  it('should have an verifyAuthToken method', () => {
    expect(verifyAuthToken).toBeDefined();
  });
  it('should have an view_userOrder method', () => {
    expect(view_userOrder).toBeDefined();
  });
});
