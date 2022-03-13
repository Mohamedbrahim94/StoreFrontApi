import Client from "../database";

export type Order = {
  id?: string;
  status: string;
  userId: string;

};

export class OrderStore {
  //index method to get all orders
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get all orders.ERROR:${error}`);
    }
  }

  //show method to get a specific order by its id
  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get order ${id}.ERROR:${error}`);
    }
  }

  //create method to create a new order
  async create(o: Order): Promise<Order> {
      if (typeof o.status === "undefined") {
      o.status = "active"; // active
    } 
    try {
      const conn = await Client.connect();
      const sql ='INSERT INTO orders (id, user_id , status) VALUES ($1, $2, $3) RETURNING *';
      if (o.status !== 'active') {
        console.log("You can only create an active order");
      } 
      const result = await conn.query(sql, [o.id,o.userId, o.status]);
      const order = result.rows[0]
      conn.release();
      return order
    } catch (error) {
      throw new Error(`unable to create a new order ${o}.ERROR:${error}`);
    }
  }

  //update method to edit an existing order
  async update(order: Order, id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *';
      const result = await conn.query(sql, [id, order.status, order.userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update order ${id}.ERROR:${error}`);
    }
  }

  //delete method to delete an existing order
  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const deletedOrder = result.rows[0];
      conn.release();
      return deletedOrder;
    } catch (error) {
      throw new Error(`unable to delete order${id}.ERROR:${error}`);
    }
  }


    async addEquipment( id: number ,quantity: number, orderId: string, equipmentId: string): Promise<Order> {

          try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_equipments (id, quantity, order_id, equipment_id ) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [id,quantity, orderId, equipmentId]);
            const order = result.rows[0];
            conn.release();
            return order
        } catch (err) {
            throw new Error(` could not add product ${equipmentId} to order ${orderId}.ERROR: ${err}`)
            
        }
    };
}
