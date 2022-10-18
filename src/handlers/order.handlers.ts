import { Request, Response } from 'express';
import { OrderModel } from '../models/order.models';
import { order } from '../types/types';

const orderslog = new OrderModel();
const index_order = async (req: Request, res: Response) => {
  try {
    const orders = await orderslog.index();
    res.send(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show_order = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (id != null) {
      const ordershow = await orderslog.show(id);
      res.send(ordershow);
    } else {
      res.status(500).send('The Id not Number');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const create_order = async (req: Request, res: Response) => {
  try {
    const { user_id, status } = req.body;

    if (!user_id || !status || status != 'active') {
      return res
        .status(400)
        .send('Please enter valid data(user_id,status) OR status != active');
    }
    const TU: order = {
      user_id,
      status,
    };
    const newOrder = await orderslog.create(TU);
    res.send(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { index_order, show_order, create_order };
