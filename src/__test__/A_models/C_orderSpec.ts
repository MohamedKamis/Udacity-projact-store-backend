import { OrderModel } from '../../models/order.models';
import { order } from '../../types/types';

const orderTest = new OrderModel();
describe('order Model', () => {
  it('should have an index Model', () => {
    expect(orderTest.index).toBeDefined();
  });

  it('should have a show Model', () => {
    expect(orderTest.show).toBeDefined();
  });

  it('should have a create Model', () => {
    expect(orderTest.create).toBeDefined();
  });
  const o = {
    user_id: '1',
    status: 'active',
  } as order;
  beforeAll(async () => {
    const newOrder = await orderTest.create(o);
    expect(newOrder.status).toEqual(o.status);
    expect(newOrder.user_id).toEqual(o.user_id);
    expect(newOrder).toBeDefined();
  });

  it('Test index if runing..', async () => {
    const result = await orderTest.index();
    expect(result).toBeDefined();
  });

  it('Test show if runing..', async () => {
    const result = await orderTest.show(1);
    expect(result.status).toEqual(o.status);
    expect(result.user_id).toEqual(o.user_id);
    expect(result).toBeDefined();
  });
});
