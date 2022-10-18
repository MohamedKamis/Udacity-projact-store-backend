import { Request, Response } from 'express';
import { AddOrderModel } from '../models/product-order.models';
import { AddOrder } from '../types/types';

const newOrder = new AddOrderModel();
const index_orderProduct = async (req: Request, res: Response) => {
  try {
    const orders = await newOrder.index();
    res.send(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show_orderProduct = async (req: Request, res: Response) => {
  try {
    const order_id = Number(req.params.order_id);
    const orders = await newOrder.show(order_id);
    res.send(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
const add_order_Product = async (_req: Request, res: Response) => {
  try {
    const { quantity, order_id, product_id } = _req.body;

    if (!quantity || !order_id || !product_id) {
      return res
        .status(400)
        .send('(Please enter valid data( user_id, status)OR status != active');
    }
    const AU: AddOrder = { quantity, order_id, product_id };
    const newAddOrder = await newOrder.addProduct(AU);
    res.send(newAddOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};
export { index_orderProduct, show_orderProduct, add_order_Product };
