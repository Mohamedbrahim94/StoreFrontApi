import Client from "../database";
import bycrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BYCRYPT_PASSWORD;

export type User = {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  user_role: string;
};

export class UserStore {
  //index method to get all users
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(` Unable to get all users.ERROR:${error}`);
    }
  }

  //show method to get a specific user with his id
  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get user ${id}.ERROR:${error}`);
    }
  }

  //create method for creating a new user
  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (username, firstname, lastname, password_digest,email, user_role ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ";
      const hash = bycrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        hash,
        user.email,
        user.user_role,
      ]);
      const newUser = result.rows[0];
      conn.release();
      return newUser;
    } catch (error) {
      throw new Error(
        `unable to create a new user ${user.username}.ERROR:${error}`
      );
    }
  }

  //update method to update an existing user by his id
  async update(user: User, id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE users SET username=($1),  firstname=($3), lastname=($4), password_digest=($2), email=($5), user_role=($6) WHERE id=($7) RETURNING * ";
      const hash = bycrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        hash,
        user.email,
        user.user_role,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update user ${user.username}.ERROR:${error}`);
    }
  }

  //delete method to delete an existing user by his id
  async delete(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const deletedUser = result.rows[0];
      conn.release();
      return deletedUser;
    } catch (error) {
      throw new Error(`unable to delete user ${id}.ERROR:${error}`);
    }
  }

  //authenticate method to make user login
  async authenticate(username: string, password: string) {
    try {
      const conn = await Client.connect();
      const sql = "SELECT password_digest FROM users WHERE username=($1)";
      const result = await conn.query(sql, [username]);
      console.log(password + pepper);
      conn.release();

      if (result.rows.length) {
        const user = result.rows[0];
        console.log(user);

        if (bycrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Authentication failed.ERROR: ${error}`);
    }
  }
}
