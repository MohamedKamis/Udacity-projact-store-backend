import { AddOrderModel } from '../../models/product-order.models';
import { client } from '../../database';
import { AddOrder } from '../../types/types';

const orderTest = new AddOrderModel();
describe('orderProduct Model', () => {
  it('should have an index Model', () => {
    expect(orderTest.index).toBeDefined();
  });

  it('should have a show Model', () => {
    expect(orderTest.show).toBeDefined();
  });

  it('should have a addProduct Model', () => {
    expect(orderTest.addProduct).toBeDefined();
  });
  const o = {
    quantity: '1',
    order_id: '1',
    product_id: '1',
  } as AddOrder;
  beforeAll(async () => {
    const newOrder = await orderTest.addProduct(o);
    expect(Number(newOrder.quantity)).toEqual(1);
    expect(Number(newOrder.order_id)).toEqual(1);
    expect(Number(newOrder.product_id)).toEqual(1);
    expect(newOrder).toBeDefined();
  });

  it('Test index if runing..', async () => {
    const result = await orderTest.index();
    expect(result).toBeDefined();
  });

  it('Test show if runing..', async () => {
    const result = await orderTest.index();
    expect(result).toBeDefined();
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql4 = 'DELETE FROM order_products;';
    const sql3 = 'DELETE FROM orders;';
    const sql2 = 'DELETE FROM products;';
    const sql1 = 'DELETE FROM users;';
    await connection.query(sql4);
    await connection.query(sql3);
    await connection.query(sql2);
    await connection.query(sql1);
    connection.release();
  });
});
