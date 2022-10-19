export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};
export type AddOrder = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
};
export type product = {
  id?: number;
  name: string;
  price: number;
};
export type order = {
  id?: number;
  user_id: string;
  status: string;
};
