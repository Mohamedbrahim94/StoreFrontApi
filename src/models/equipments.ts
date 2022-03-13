import { resourceLimits } from "worker_threads";
import Client from "../database";

export type Equipment = {
  id?: string;
  name: string;
  price: number;
  category?: string;
};

export class EquipmentStore {
  async index(): Promise<Equipment[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM equipments";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get all equipments.ERROR:${error}`);
    }
  }

  async show(id: string): Promise<Equipment> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM equipments WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get equipment ${id}.ERROR:${error}`);
    }
  }

  async create(equipment: Equipment): Promise<Equipment> {
    try {
      let category = equipment.category;
      if (typeof category === "undefined") {
        category = "";
      }
      const conn = await Client.connect();
      const sql =
        "INSERT INTO equipments (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        equipment.name,
        equipment.price,
        equipment.category,
      ]);
      const equip = result.rows[0];
      conn.release();
      return equip;
    } catch (error) {
      throw new Error(
        `unable to create an equipment ${equipment.name}.ERROR:${error}`
      );
    }
  }

  async update(equipment: Equipment, id?: string): Promise<Equipment> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE equipments SET name=($1) , price=($2) , category=($3) WHERE id=($4) RETURNING *";
      const result = await conn.query(sql, [
        equipment.name,
        equipment.price,
        equipment.category,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update that equipment${id}.ERROR:${error}`);
    }
  }

  async delete(id: string): Promise<Equipment> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM equipments WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to delete that equipment ${id}.ERROR:${error}`);
    }
  }

  async equipmentsByCategory(category: string): Promise<Equipment[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM equipments WHERE category=($1)";
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get equipment ${category}.ERROR:${error} `);
    }
  }
}
