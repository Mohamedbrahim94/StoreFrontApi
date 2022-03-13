import express, { Request, Response, NextFunction } from 'express';
import { Order, OrderStore } from '../models/order';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

const order_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.post('/orders/:id/equipments', addEquipment);
};

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
    const order: Order = {
        id: req.body.id,
        userId: req.body.userId,
        status: req.body.status
       
 }
  try {
    const newOrder = await store.create(order);
    const token = jwt.sign({ order: newOrder }, tokenSecret);
    res.json(token).json(newOrder);
    console.log(token);
    res.json(newOrder);
  } catch (error) {
    res.status(400).json(error as string);
  }
};

 const update = async (req: Request, res: Response) => {
  const order: Order = {
         id: req.body.id,
        userId: req.body.userId,
        status: req.body.status
        
  };

  try {
    const updatedOrder = await store.update(order, req.params.id);
    res.json(updatedOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
}; 

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(req.body.id);
    res.json(deletedOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addEquipment = async (req: Request, res: Response) => {
 const id: number = req.body.id;
  const quantity: number = parseInt(req.body.quantity as string)
  const orderId: string = req.body.orderId;
  const equipmentId: string = req.body.equipmentId;
   
  try {
      const addedEquipment = await store.addEquipment(
        id,
      quantity,
      orderId,
      equipmentId
    );
    res.json(addedEquipment);
  } catch (error) {
      throw new Error(` ${error}`);
    res.status(400);
    res.json(error);
  }
};
//Using jwt with this function then add it to routes as amiddleware protect routes
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string = req.headers.authorization as string;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, tokenSecret);
    const decoded = decodeJwt(token as string);
    req.body.user_role = decoded.user;
    next();
   
  } catch (error) {
    res.status(401);
    res.json(`invalid token.ERROR:${error}`);
 
  }
};

const decodeJwt = (token: string) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
};


export default order_routes;
