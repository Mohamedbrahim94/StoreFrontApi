import Client from "../database";
import { Order } from "../models/order";
import { Equipment } from "../models/equipments";

type equipsInOrders = {
  name: string;
  price: string;
  category: string;
  order_id: string;
};

type usersMadeOrders = {
  firstname: string;
  lastname: string;
};

export class DashboardQueries {
  //method to get all equipments in the orders
  async equipmentsInOrders(): Promise<equipsInOrders[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT name, price, category, order_id FROM equipments INNER JOIN order_equipments ON equipment.id = order_equipments.equipment_id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get equipments and orders.ERROR:${error}`);
    }
  }

  //method to get all the users who have made orders
  async usersWithOrders(): Promise<usersMadeOrders[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT firstname, lastname FROM users INNER JOIN orders ON user.id = orders.user_id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get the users who made orders.ERROR:${error}`);
    }
  }

  //method to get five most popular equipments
  async fiveMostPopularEquipments(): Promise<Equipment[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM equipments e INNER JOIN order_equipments oe ON e.id=oe.equipment_id ORDER BY oe.quantity DESC LIMIT 5";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to get top five most popular equipments.ERROR:${error}`
      );
    }
  }


  //method to get most five expensive equipments
  async fiveMostExpensiveEquipments(): Promise<
    { name: string; price: number }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT name, price FROM equipments ORDER BY price DESC LIMIT 5 ";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to get equipments by price. ERROR: ${err}`);
    }
  }
}
