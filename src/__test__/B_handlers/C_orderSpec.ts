import supertest from 'supertest';
import app from '../../index';
import { order } from '../../types/types';
import { client } from '../../database';
import {
  create_order,
  show_order,
  index_order,
} from '../../handlers/order.handlers';
const o = {
  user_id: '1',
  status: 'active',
} as order;
const NewApp = supertest(app);
let token: string;

describe('User handler', () => {
  it('should have an create_order method', () => {
    expect(create_order).toBeDefined();
  });
  it('should have an show_order method', () => {
    expect(show_order).toBeDefined();
  });
  it('should have an index_order method', () => {
    expect(index_order).toBeDefined();
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

  it('test order api create...', async () => {
    const request = await NewApp.post(`/order`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(o)
      .expect(200);
    const data = request.body;
    expect(request.status).toBe(200);
    expect(data.user_id).toEqual(o.user_id);
    expect(data.status).toBe(o.status);
  });
  it('test order api index...', async () => {
    const connection = await client.connect();
    const sql = 'DELETE FROM orders WHERE id=(2);';
    await connection.query(sql);
    connection.release();
    const request = await NewApp.get(`/order`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    request.body.forEach(
      (orderType: { id?: number; user_id: string; status: string }) => {
        const data = orderType;
        expect(data).toEqual({
          id: 1,
          user_id: '1',
          status: 'active',
        });
      }
    );
  });
});
