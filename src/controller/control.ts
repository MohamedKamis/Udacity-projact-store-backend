import express from 'express';
import {
  index_order,
  show_order,
  create_order,
} from '../handlers/order.handlers';
import {
  index_user,
  show_user,
  create_user,
  view_userOrder,
  authenticate,
  verifyAuthToken,
} from '../handlers/users.handlers';
import {
  index_product,
  show_product,
  create_product,
  update_product,
  destroy_product,
} from '../handlers/product.handlers';
import {
  index_orderProduct,
  show_orderProduct,
  add_order_Product,
} from '../handlers/product-order.handlers';

const routes = (app: express.Application) => {
  //user Route

  app.get('/user', index_user);
  app.get('/user/:id', verifyAuthToken, show_user);
  app.post('/user', create_user);
  app.post('/user/log', authenticate);
  app.get('/user/order/:user_id', verifyAuthToken, view_userOrder);

  //product Route

  app.get('/product', verifyAuthToken, index_product);
  app.get('/product/:id', verifyAuthToken, show_product);
  app.post('/product', verifyAuthToken, create_product);
  app.put('/product', verifyAuthToken, update_product);
  app.delete('/product', verifyAuthToken, destroy_product);

  //order Route

  app.get('/order', verifyAuthToken, index_order);
  app.get('/order/:id', verifyAuthToken, show_order);
  app.post('/order', verifyAuthToken, create_order);

  //order_Product Route

  app.get('/order-product', verifyAuthToken, index_orderProduct);
  app.get('/order-product/:order_id', verifyAuthToken, show_orderProduct);
  app.post('/order-product', verifyAuthToken, add_order_Product);
};
export default routes;
