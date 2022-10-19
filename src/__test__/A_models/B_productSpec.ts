import { ProductModel } from '../../models/product.models';
import { product } from '../../types/types';

import dotenv from 'dotenv';

dotenv.config();
const productTest = new ProductModel();
describe('Product Model', () => {
  it('should have an index Model', () => {
    expect(productTest.index).toBeDefined();
  });

  it('should have a show Model', () => {
    expect(productTest.show).toBeDefined();
  });

  it('should have a create Model', () => {
    expect(productTest.create).toBeDefined();
  });

  const p = {
    name: 'new-product',
    price: 2,
  } as product;

  beforeAll(async () => {
    const newProduct = await productTest.create(p);
    expect(newProduct.name).toEqual(p.name);
    expect(newProduct.price).toEqual(p.price);
  });
  it('Test show if runing..', async () => {
    const result = await productTest.show(1);
    expect(result.name).toEqual(p.name);
    expect(result.price).toEqual(p.price);
  });
  it('Test index if runing..ts', async () => {
    const result = await productTest.index();
    expect(result).toBeDefined();
  });
});
