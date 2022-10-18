import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const { Postgres_host, Postgres_user, Postgres_password, Postgres_database } =
  process.env;
const client = new Pool({
  host: Postgres_host,
  user: Postgres_user,
  password: Postgres_password,
  database: Postgres_database,
});

export { client };
