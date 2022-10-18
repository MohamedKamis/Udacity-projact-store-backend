import { client } from '../database';
import { AddOrder } from '../types/types';
export class AddOrderModel {
  async index(): Promise<AddOrder[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM order_products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }

  async show(id: number): Promise<AddOrder> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM order_products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async addProduct(PO: AddOrder): Promise<AddOrder> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const connection = await client.connect();

      const result = await connection.query(sql, [
        PO.quantity,
        PO.order_id,
        PO.product_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `cant add order_products ${(PO.order_id, PO.product_id)}: ${error}`
      );
    }
  }
}
