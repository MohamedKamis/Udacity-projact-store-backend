import supertest from 'supertest';
import app from '../../index';
import { product } from '../../types/types';
import {
  create_product,
  show_product,
  index_product,
  update_product,
  destroy_product,
} from '../../handlers/product.handlers';
import { client } from '../../database';

describe('User handler', () => {
  it('should have an create_product method', () => {
    expect(create_product).toBeDefined();
  });
  it('should have an show_product method', () => {
    expect(show_product).toBeDefined();
  });
  it('should have an index_product method', () => {
    expect(index_product).toBeDefined();
  });
  it('should have an update_product method', () => {
    expect(update_product).toBeDefined();
  });
  it('should have an destroy_product method', () => {
    expect(destroy_product).toBeDefined();
  });
  const p = {
    name: 'egg',
    price: 4,
  } as product;
  const NewApp = supertest(app);
  let token: string;

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

  it('test product api create...', async () => {
    const request = await NewApp.post(`/product`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(p)
      .expect(200);
    const data = request.body;
    expect(request.status).toBe(200);
    expect(data.name).toEqual(p.name);
    expect(data.price).toBe(p.price);
  });

  it('test product api delete...', async () => {
    const request = await NewApp.delete(`/product`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const connection = await client.connect();
    const sql = 'DELETE FROM products WHERE id=(2);';
    await connection.query(sql);
    connection.release();
    expect(request.status).toBe(200);
  });
  it('test product api index...', async () => {
    const request = await NewApp.get(`/product`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    request.body.forEach(
      (productType: { id: number; name: string; price: number }) => {
        const data = productType;
        expect(data).toEqual({
          id: 1,
          name: 'new-product',
          price: 2,
        });
      }
    );
  });
});
