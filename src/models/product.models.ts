import { client } from '../database';
import { product } from '../types/types';

export class ProductModel {
  async index(): Promise<product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }

  async show(id: number): Promise<product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async create(p: product): Promise<product> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO products (name,price) VALUES($1,$2) RETURNING *';
      const result = await connection.query(sql, [p.name, p.price]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async update(PY: product): Promise<product> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE products SET name=($1),price=($2) WHERE id=($3) RETURNING *';
      const result = await connection.query(sql, [PY.name, PY.price, PY.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async delete(id: number): Promise<product> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
}
