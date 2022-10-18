import { Request, Response } from 'express';
import { ProductModel } from '../models/product.models';
import { product } from '../types/types';

const productlog = new ProductModel();

const index_product = async (req: Request, res: Response) => {
  try {
    const products = await productlog.index();
    res.send(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show_product = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const products = await productlog.show(id);
    res.send(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create_product = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).send('Please enter valid data( name, price)');
    }
    const PT: product = { name, price };
    const newproduct = await productlog.create(PT);
    res.send(newproduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const update_product = async (req: Request, res: Response) => {
  try {
    const { id, name, price } = req.body;
    const PT: product = { id, name, price };
    const updateproduct = await productlog.update(PT);
    res.send(updateproduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const destroy_product = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deleteProduct = await productlog.delete(id);
    res.send(deleteProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  index_product,
  show_product,
  create_product,
  update_product,
  destroy_product,
};
