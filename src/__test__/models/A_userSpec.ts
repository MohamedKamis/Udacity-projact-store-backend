import { UserModel } from '../../models/users.models';
import { User } from '../../types/types';

const user = new UserModel();

describe('User Model', () => {
  it('should have an index Model', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show Model', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create Model', () => {
    expect(user.create).toBeDefined();
  });

  const u = {
    firstname: 'new-firstname',
    lastname: 'new-lastname',
    password: 'new-password',
  } as User;

  beforeAll(async () => {
    const newuser = await user.create(u);
    expect(newuser.firstname).toEqual('new-firstname');
    expect(newuser.lastname).toEqual('new-lastname');
    expect(newuser.password).toBeDefined();
  });

  it('Test index if runing..', async () => {
    const result = await user.index();
    expect(result).toBeDefined();
  });
});
