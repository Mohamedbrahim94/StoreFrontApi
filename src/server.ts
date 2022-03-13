import express, { Request, Response, NextFunction } from "express";
//import bodyParser from "body-parser";
import cors from "cors";
import user_routes from "./handlers/user";
import order_routes from "./handlers/order";
import equipment_routes from "./handlers/equipments";
import dashbboard_routes from "./handlers/dashboard";

const app: express.Application = express();
const address = "0.0.0.0:3000";

const corsOptions = {
  optionsSuccessStatus: 200,
};
//middlewares
app.use(cors(corsOptions));
//app.use(bodyParser.json());
app.use(express.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("Welcome to server homePage");
});

//RESTful routes
user_routes(app);
order_routes(app);
equipment_routes(app);
dashbboard_routes(app);

app.get(
  "/test-cors",
  cors(corsOptions),
  (_req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "This is CORS enabled with a middleware" });
  }
);

app.listen(3000, function () {
  console.log(`App is starting on ${address}`);
});

export default app;
