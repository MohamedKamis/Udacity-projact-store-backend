import {
  create_product,
  show_product,
  index_product,
  update_product,
  destroy_product,
} from '../../handlers/product.handlers';

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
});
