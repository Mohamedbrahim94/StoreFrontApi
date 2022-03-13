import express, { Request, Response, NextFunction } from "express";
import { Equipment, EquipmentStore } from "../models/equipments";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

const equipment_routes = (app: express.Application) => {
  app.get("/equipments", index);
  app.get("/equipments/:id", show);
  app.get("/equipments/category/:category", equipmentByCategory);
  app.post("/equipments", verifyAuthToken, create);
  app.put("/equipments/:id", verifyAuthToken, update);
  app.delete("/equipments/:id", verifyAuthToken, destroy);
};

const store = new EquipmentStore();

const index = async (_req: Request, res: Response) => {
  try {
    const equipments = await store.index();
    res.json(equipments);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const equipment = await store.show(req.params.id);
    res.json(equipment);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const equipment: Equipment = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const createdEquipment = await store.create(equipment);
    res.json(createdEquipment);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const equipment: Equipment = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const updatedEquipment = await store.update(equipment, req.params.id);
    res.json(updatedEquipment);
  } catch (error) {
    res.status(400);
    res.json(`Ivalid token. ${error}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedEquipment = await store.delete(req.params.id);
    res.json(deletedEquipment);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const equipmentByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const equipment = await store.equipmentsByCategory(category);
    res.json(equipment);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};



//Using jwt with this function then add it to routes as amiddleware protect routes
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string = req.headers.authorization as string;
    const token: string = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);
    const decoded = decodeJwt(token as string);
    req.body.user_role = decoded.user;
    next();
  } catch (error) {
    res.status(401);
    res.json(`invalid token.ERROR:${error}`);
    // return;
  }
};

const decodeJwt = (token: string) => {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
};

export default equipment_routes;
