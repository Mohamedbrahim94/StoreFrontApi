import { User, UserStore } from "../models/users";
import supertest from "supertest";
import app from "../server";

const request = supertest(app);
const store = new UserStore();
let testedUser: User = {} as User;

describe("User Model", () => {
  it("should return an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should return a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should return a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should return an update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should return a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("should return an authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("a create method should create a new users", async () => {
    const newUser: User = await store.create({
      username: "mohamed_ibra20",
      password: "secretpasswordibrahim",
      firstname: "mohamed",
      lastname: "ibrahim",
      email: "mohamedibrahim@gmail.com",
      user_role: "ADMIN",
    });
    testedUser = newUser;
    expect(newUser).toEqual(
      jasmine.objectContaining({
        id: testedUser.id,
        username: "mohamed_ibra20",
        firstname: "mohamed",
        lastname: "ibrahim",
        email: "mohamedibrahim@gmail.com",
        user_role: "ADMIN",
      })
    );
  });

  it("an index method should return all users", async () => {
    const listOfAllUsers = await store.index();
    expect(listOfAllUsers).toContain(
      jasmine.objectContaining({
        id: testedUser.id,
        username: "mohamed_ibra20",
        firstname: "mohamed",
        lastname: "ibrahim",
        email: "mohamedibrahim@gmail.com",
        user_role: "ADMIN",
      })
    );
  });

  it(" a show method should return a specific user by his id ", async () => {
    //check if user exist or not before processing
    if (testedUser === null || testedUser.id === null) {
      throw new Error("unable to show user information as it does not exist");
    }
    const showUser = await store.show(testedUser.id as string);

    expect(showUser).toEqual(
      jasmine.objectContaining({
        id: testedUser.id,
        username: "mohamed_ibra20",
        firstname: "mohamed",
        lastname: "ibrahim",
        email: "mohamedibrahim@gmail.com",
        user_role: "ADMIN",
      })
    );
  });

  it("a delete method should delete users exists by their ids", async () => {
    //check that the target user to be deleted already exists
    if (testedUser === null || testedUser.id === null) {
      throw new Error("unable to delete a user which does not exist");
    }
    const deletedUser = store.delete(testedUser.id as string);
    const listOfAllUsers = await store.index();
    expect(listOfAllUsers).toEqual([]);
    return deletedUser;
  });
});
