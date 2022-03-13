import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { DashboardQueries } from "../service/dashboard";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

//dashboard routes
const dashbboard_routes = (app: express.Application) => {
  app.get("/equipments-in-orders", equipmentsInOrders);
  app.get("/users-with-orders", usersWithOrders);
  app.get("/five-most-popular", fiveMostPopularEquipments);
  app.get("/five-most-expensive", fiveMostExpensiveEquipments);
};

const dashboardStore = new DashboardQueries();

const equipmentsInOrders = async (_req: Request, res: Response) => {
  try {
    const equipments = await dashboardStore.equipmentsInOrders();
    res.json(equipments);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboardStore.usersWithOrders();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const fiveMostPopularEquipments = async (_req: Request, res: Response) => {
  try {
    const popular = await dashboardStore.fiveMostPopularEquipments();
    res.json(popular);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};


 
const fiveMostExpensiveEquipments = async (_req: Request, res: Response) => {
  try {
    const mostExpensive = await dashboardStore.fiveMostExpensiveEquipments();
    res.json(mostExpensive);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};



export default dashbboard_routes;
