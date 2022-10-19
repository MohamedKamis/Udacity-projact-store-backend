import supertest from 'supertest';
import app from '../../index';
import { User } from '../../types/types';

import {
  create_user,
  show_user,
  index_user,
  authenticate,
  verifyAuthToken,
  view_userOrder,
} from '../../handlers/users.handlers';

describe('User handler Tasting....', () => {
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
  const u = {
    firstname: 'TestName1',
    lastname: 'TestName2',
    password: '123456',
  } as User;
  const NewApp = supertest(app);
  let token: string;
  let user_id: string | number;
  let data: string;

  it('test user api', async () => {
    const request1 = await NewApp.post('/user')
      .set('Content-type', 'application/json')
      .send(u)
      .expect(200);
    expect(request1.status).toBe(200);
    user_id = Number(request1.body.id);
  });

  it('test user api token...', async () => {
    const request2 = await NewApp.post('/user/log')
      .set('Content-type', 'application/json')
      .send({
        firstname: 'TestName1',
        password: '123456',
      })
      .expect(200);
    expect(request2.status).toBe(200);
    token = request2.text;
  });

  it('test user api token...', async () => {
    await NewApp.get(`/user/${user_id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((row) => {
        data = row.body;
        expect(data);
      });
  });
});

// afterAll(async () => {
//   const connection = await client.connect();
//   const sql4 = 'DELETE FROM order_products;';
//   const sql3 = 'DELETE FROM orders;';
//   const sql2 = 'DELETE FROM products;';
//   const sql1 = 'DELETE FROM users;';
//   await connection.query(sql4);
//   await connection.query(sql3);
//   await connection.query(sql2);
//   await connection.query(sql1);
//   connection.release();
// });
