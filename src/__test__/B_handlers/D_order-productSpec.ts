import supertest from 'supertest';
import app from '../../index';
import { AddOrder } from '../../types/types';
import { client } from '../../database';
import {
  add_order_Product,
  show_orderProduct,
  index_orderProduct,
} from '../../handlers/product-order.handlers';
const o = {
  order_id: '1',
  quantity: 10,
  product_id: '1',
} as AddOrder;
const NewApp = supertest(app);
let token: string;

describe('order_Product handler', () => {
  it('should have an add_order_Product method', () => {
    expect(add_order_Product).toBeDefined();
  });
  it('should have an show_orderProduct method', () => {
    expect(show_orderProduct).toBeDefined();
  });
  it('should have an index_orderProduct method', () => {
    expect(index_orderProduct).toBeDefined();
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

  it('test order_Product api create...', async () => {
    const request = await NewApp.post(`/order-product`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(o)
      .expect(200);
    const data = request.body;
    expect(request.status).toBe(200);
    expect(data.order_id).toEqual(o.order_id);
    expect(data.product_id).toBe(o.product_id);
    expect(data.quantity).toBe(o.quantity);
  });
  it('test order_Product api index...', async () => {
    const connection = await client.connect();
    const sql = 'DELETE FROM order_products WHERE id=(2);';
    await connection.query(sql);
    connection.release();
    const request = await NewApp.get(`/order-product`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    request.body.forEach(
      (orderType: {
        id?: number;
        order_id: string;
        product_id: string;
        quantity: number;
      }) => {
        const data = orderType;
        expect(data).toEqual({
          id: 1,
          order_id: '1',
          product_id: '1',
          quantity: 1,
        });
      }
    );
  });
});
