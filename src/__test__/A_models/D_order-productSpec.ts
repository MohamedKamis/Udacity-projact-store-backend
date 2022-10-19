import { AddOrderModel } from '../../models/product-order.models';
import { AddOrder } from '../../types/types';
import { UserModel } from '../../models/users.models';
const user = new UserModel();
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
    quantity: 1,
    order_id: '1',
    product_id: '1',
  } as AddOrder;
  beforeAll(async () => {
    const newOrder = await orderTest.addProduct(o);
    expect(Number(newOrder.quantity)).toEqual(Number(o.quantity));
    expect(Number(newOrder.order_id)).toEqual(Number(o.order_id));
    expect(Number(newOrder.product_id)).toEqual(Number(o.quantity));
    expect(newOrder).toBeDefined();
  });

  it('Test index if runing..', async () => {
    const result = await orderTest.index();
    expect(result).toBeDefined();
  });

  it('Test show if runing..', async () => {
    const result = await orderTest.show(1);
    expect(Number(result.order_id)).toEqual(Number(o.order_id));
    expect(Number(result.product_id)).toEqual(Number(o.product_id));
    expect(Number(result.quantity)).toEqual(Number(o.quantity));
    expect(result).toBeDefined();
  });
  it('Test view_userOrder if runing..', async () => {
    const result = await user.view_userOrder(1);
    expect(result).toBeDefined();
  });
});
