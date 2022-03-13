import express, { Request, Response, NextFunction } from "express";
import { User, UserStore } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//user routes
const user_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.delete("/users/:id", destroy);
  app.put("/users/:id", verifyAuthToken, update);
  app.post("/users/login", authenticate);
};

const store = new UserStore();
const tokenSecret = process.env.TOKEN_SECRET as string;

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const showUser: User = await store.show(req.params.id);
    res.json(showUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
    user_role: req.body.user_role,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
    console.log(token);
  } catch (error) {
    res.status(400);
    res.json((error as string) + user);
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    user_role: req.body.user_role,
  };
  try {
    const updatedUser = await store.update(user, req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(400);
    res.json(`Ivalid token. ${error}`);
  }
};


const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const authUser = await store.authenticate(
      req.body.username,
      req.body.password
    );
    if (authUser != null) {
      const token = jwt.sign(
        { user: authUser },
        process.env.TOKEN_SECRET as string
      );
      res.json(token);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.json({ error: `${error}` });
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
   
  }
};

const decodeJwt = (token: string) => {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
};

export default user_routes;
