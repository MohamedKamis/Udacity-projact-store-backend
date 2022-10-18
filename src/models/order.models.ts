import { client } from '../database';
import { order } from '../types/types';

export class OrderModel {
  async index(): Promise<order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async show(id: number): Promise<order> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async create(o: order): Promise<order> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (user_id,status) VALUES($1,$2) RETURNING *';
      const result = await connection.query(sql, [o.user_id, o.status]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
}
