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
    id: 1,
    firstname: 'new-firstname',
    lastname: 'new-lastname',
    password: 'new-password',
  } as User;

  beforeAll(async () => {
    const newuser = await user.create(u);
    expect(u.firstname).toEqual(newuser.firstname);
    expect(u.lastname).toEqual(newuser.lastname);
    expect(newuser.lastname).toBeDefined();
  });

  it('Test index if runing..', async () => {
    const result = await user.index();
    expect(result).toBeDefined();
  });
  it('Test show if runing..', async () => {
    const result = await user.show(1);
    expect(u.firstname).toEqual(result.firstname);
    expect(u.lastname).toEqual(result.lastname);
    expect(result.password).toBeDefined();
  });
  it('Test show if runing..', async () => {
    const result = await user.authenticate(u.firstname, u.password);
    expect(result).toBeDefined();
  });
});
