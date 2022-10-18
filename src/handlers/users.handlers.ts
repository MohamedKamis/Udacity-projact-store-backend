import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/users.models';
import { User } from '../types/types';

const userslog = new UserModel();

const index_user = async (req: Request, res: Response) => {
  try {
    const users = await userslog.index();
    res.send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show_user = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const User = await userslog.show(id);
    res.send(User);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create_user = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    if (!firstname || !lastname || !password) {
      return res
        .status(400)
        .send('Please enter valid data( firstName, lastName, password)');
    }
    const TU: User = { firstname, lastname, password };
    const newuser = await userslog.create(TU);
    res.send(newuser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const authenticate = async function (req: Request, res: Response) {
  try {
    const user: User = {
      firstname: req.body.firstname,
      password: req.body.password,
      lastname: '',
    };

    const { TOKEN_SECRET } = process.env;
    await userslog.authenticate(user.firstname, user.password);
    const tokin = jwt.sign(
      { userId: user.id, userName: user.firstname },
      TOKEN_SECRET as string
    );
    return res.send(tokin);
  } catch (error) {
    res.status(500).json(error);
  }
};
const verifyAuthToken = (req: Request, res: Response) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET as string);
  } catch (error) {
    res
      .status(401)
      .json(
        'Access denied, invalid token ,Pleas go to (http://localhost:2000/user/log)'
      );
    return;
  }
};

const view_userOrder = async (req: Request, res: Response) => {
  try {
    const { TOKEN_SECRET } = process.env;
    try {
      const authorizationHeader = req.headers.authorization as string;
      const token = authorizationHeader.split(' ')[1];
      jwt.verify(token, TOKEN_SECRET as string);
    } catch (error) {
      res
        .status(401)
        .json(
          'Access denied, invalid token ,Pleas go to (http://localhost:2000/user/log)'
        );
      return;
    }
    const userId = Number(req.params.user_id);
    const userOrders = await userslog.view_userOrder(userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  index_user,
  show_user,
  create_user,
  view_userOrder,
  authenticate,
  verifyAuthToken,
};
