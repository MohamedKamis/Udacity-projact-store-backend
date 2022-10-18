import { client } from '../database';
import { SALT_ROUNDS, PEPPER } from '../dotenv/dotenv';
import { User } from '../types/types';
import bcrypt from 'bcrypt';

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (firstName,lastName,password) VALUES($1,$2,$3) RETURNING *';
      const hash = bcrypt.hashSync(u.password + PEPPER, Number(SALT_ROUNDS));
      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        hash,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`you have an error: ${error}`);
    }
  }
  async view_userOrder(
    user_id: number
  ): Promise<{ id: number; status: string; quantity: number }[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT orders.id, orders.status, order_products.quantity FROM orders
      JOIN order_products ON orders.id = order_products.order_id
      where orders.user_id = ($1) and orders.status = 'active'`;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get this order. Error: ${error}`);
    }
  }
  async authenticate(
    firstname: string,
    password: string
  ): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT password FROM users WHERE firstname=($1)';

    const result = await conn.query(sql, [firstname]);

    if (result.rows.length) {
      const user = result.rows[0];
      const hash = bcrypt.hashSync(password + PEPPER, Number(SALT_ROUNDS));
      if (hash) {
        return user;
      }
    }

    return null;
  }
}
