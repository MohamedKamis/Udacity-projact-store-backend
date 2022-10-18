import {
  add_order_Product,
  show_orderProduct,
  index_orderProduct,
} from '../../handlers/product-order.handlers';

describe('User handler', () => {
  it('should have an add_order_Product method', () => {
    expect(add_order_Product).toBeDefined();
  });
  it('should have an show_orderProduct method', () => {
    expect(show_orderProduct).toBeDefined();
  });
  it('should have an index_orderProduct method', () => {
    expect(index_orderProduct).toBeDefined();
  });
});
