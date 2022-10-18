import {
  create_order,
  show_order,
  index_order,
} from '../../handlers/order.handlers';

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
});
